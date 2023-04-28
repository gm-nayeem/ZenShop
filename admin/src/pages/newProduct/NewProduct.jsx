import "./newProduct.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { userRequest } from "../../utils/makeRequest";
import upload from "../../utils/upload";
import NO_IMG_ICON from "../../assets/no-image-icon.jpeg";


const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError
  } = useFetch("/categories/all");

  const {
    data: subCategoryData,
    loading: subCategoryLoading,
    error: subCategoryError
  } = useFetch("/subcategories/all");

  const navigate = useNavigate();

  // set product
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // set categories
  const handleCategories = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategories(value);
  };

  // set subCategories
  const handleSubCategories = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSubCategories(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const colorArr = product?.color.split(", ");
    const sizeArr = product?.size.split(", ");

    try {
      // get files url lists
      const lists = await Promise.all(
        Object.values(files).map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      const newProduct = {
        ...product,
        color: colorArr,
        size: sizeArr,
        categories: categories[0],
        subCategories: subCategories[0],
        img: lists[0],
        img2: lists[1],
      };

      const res = await userRequest.post("/products", newProduct);
      res && navigate("/products");
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <div className='new'>
      <div className="top">
        <h1>Add New Product</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              files ? URL.createObjectURL(files[0]) : NO_IMG_ICON
            }
            alt=""
          />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label htmlFor='file'>
                Image: <DriveFolderUploadOutlined className='icon' />
              </label>
              <input
                type="file"
                name="file"
                id='file'
                multiple
                onChange={e => setFiles(e.target.files)}
                style={{ display: "none" }}
              />
            </div>
            {
              productInputs.map((input, i) => (
                <div className="formInput" key={i}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))
            }
            <div className="formInput2">
              <label style={{ marginBottom: "5px" }}>Type</label>
              <select name="type" id="type" onChange={handleChange}>
                <option value="normal">Normal</option>
                <option value="featured">Featured</option>
                <option value="trending">Trending</option>
              </select>
            </div>
            <div className="formInput2">
              <label style={{ marginBottom: "5px" }}>IsNew?</label>
              <select name="isUpdated" id="isUpdated" onChange={handleChange}>
                <option value={true}>true</option>
                <option value={false}>false</option>
              </select>
            </div>
            <div className="formInput2">
              <label style={{ marginBottom: "5px" }}>InStock?</label>
              <select name="inStock" id="inStock" onChange={handleChange}>
                <option value={true}>true</option>
                <option value={false}>false</option>
              </select>
            </div>
            <div className="formInput3">
              <label>Categories</label>
              <select
                name="categories" id="categories"
                multiple onChange={handleCategories}
              >
                {
                  categoryLoading ? (
                    "Loading please wait..."
                  ) : categoryError ? (
                    "Something went wrong!!"
                  ) : (
                    categoryData && categoryData.map(cat => (
                      <option key={cat._id} value={cat.title}>
                        {cat.title}
                      </option>
                    ))
                  )
                }
              </select>
            </div>
            <div className="formInput3">
              <label>Sub categories</label>
              <select
                name="subCategories" id="subCategories"
                multiple onChange={handleSubCategories}
              >
                {
                  subCategoryLoading ? (
                    "Loading please wait..."
                  ) : subCategoryError ? (
                    "Something went wrong!!"
                  ) : (
                    subCategoryData && subCategoryData.map(subCat => (
                      <option key={subCat._id} value={subCat.title}>
                        {subCat.title}
                      </option>
                    ))
                  )
                }
              </select>
            </div>
            <button onClick={handleSubmit}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;