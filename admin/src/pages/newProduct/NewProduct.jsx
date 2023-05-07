import "./newProduct.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { userRequest } from "../../utils/makeRequest";
import NO_IMG_ICON from "../../assets/no-image-icon.jpeg";
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../config/firebase";


const NewHotel = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [files, setFiles] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);

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

  // multiple file upload using firebase
  const upload = (items) => {
    let count = 0;
    setFileLoading(true);

    items.forEach(item => {
      // firebase setup
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storage = getStorage(app);

      const storageRef = ref(storage, `/products/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (err) => {
          // Handle unsuccessful uploads
          console.log(err.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct(prev => {
              return {
                ...prev,
                [item.label]: downloadURL
              }
            });

            count += 1;
            count === 2 && setFileLoading(false);
            setUploaded(prev => prev + 1);
          });
        }
      );
    })
  }

  // handle upload
  const handleUpload = async (e) => {
    e.preventDefault();

    const productImg = Object.values(files).map(file => file);

    upload([
      { file: productImg[0], label: "img" },
      { file: productImg[1], label: "img2" },
      { file: productImg[2], label: "img3" },
    ]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const colorArr = product?.color?.split(",");
    const sizeArr = product?.size?.split(",");

    try {
      const newProduct = {
        ...product,
        color: colorArr,
        size: sizeArr,
        categories: categories[0],
        subCategories: subCategories[0]
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
          <div className="leftWrapper">
            <img
              src={
                files ? URL.createObjectURL(files[0]) : NO_IMG_ICON
              }
              alt=""
            />
            <img
              src={
                files ? URL.createObjectURL(files[1]) : NO_IMG_ICON
              }
              alt=""
            />
            <img
              src={
                files ? URL.createObjectURL(files[2]) : NO_IMG_ICON
              }
              alt=""
            />
            {
              fileLoading ? (
                <button className="productUpdateButton">Uploading...</button>
              ) : uploaded === 3 ? (
                <button className="productUpdateButton" onClick={handleSubmit}>Submit</button>
              ) : (
                <button className="productUpdateButton" onClick={handleUpload}>Upload</button>
              )
            }
          </div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;