import React, { useState } from 'react';
import './productUpdate.scss';
import { Publish } from "@mui/icons-material";
import { DEFAULT_IMG_URL } from "../../private/URL";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ProductUpdate = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [updatedProductPic, setUpdatedProductPic] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // handle upload
  const handleUpload = async (e) => {
    const files = Object.values(updatedProductPic).map(file => file.name);

    // console.log(files);
  }

  // handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    updatedProduct.color = updatedProduct.color.split(",");
    updatedProduct.size = updatedProduct.size.split(",");

    // update user
    Object.keys(updatedProduct).forEach((key) => {
      Object.keys(product).forEach((key2) => {
        if (key === key2) {
          product[key2] = updatedProduct[key]
        }
      })
    });

    // updateUser(dispatch, product?._id, product);
    // navigate("/products");
  }


  return (
    <div className="productUpdate">
      <span className="productUpdateTitle">Edit</span>
      <form className="productUpdateForm">
        <div className="productUpdateLeft">
          <div className="productUpdateItem">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder={product?.title}
              className="productUpdateInput"
              required
              onChange={handleChange}
            />
          </div>
          <div className="productUpdateItem">
            <label>Description</label>
            <input
              type="text"
              name="desc"
              placeholder={product?.desc}
              className="productUpdateInput"
              required
              onChange={handleChange}
            />
          </div>
          <div className="productUpdateItem">
            <label>Price</label>
            <input
              type="text"
              name="price"
              placeholder={product?.price}
              className="productUpdateInput"
              onChange={handleChange}
            />
          </div>
          <div className="productUpdateItem">
            <label>Size</label>
            <input
              type="text"
              name="size"
              placeholder={product?.size}
              className="productUpdateInput"
              onChange={handleChange}
            />
          </div>
          <div className="productUpdateItem">
            <label>Color</label>
            <input
              type="text"
              name="color"
              placeholder={product?.color}
              className="productUpdateInput"
              onChange={handleChange}
            />
          </div>
          <div className="productUpdateItem">
            <label style={{ marginBottom: "5px" }}>Type</label>
            <select name="type" id="type" onChange={handleChange}>
              <option value="normal">Normal</option>
              <option value="featured">Featured</option>
              <option value="trending">Trending</option>
            </select>
          </div>
          <div className="productUpdateItem">
            <label style={{ marginBottom: "5px" }}>IsNew?</label>
            <select name="isUpdated" id="isUpdated" onChange={handleChange}>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
          <div className="productUpdateItem">
            <label style={{ marginBottom: "5px" }}>InStock?</label>
            <select name="inStock" id="inStock" onChange={handleChange}>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
        </div>
        <div className="productUpdateRight">
          <div className="productUpdateWrapper">
            <div className="productUpdateUpload">
              <img
                className="productUpdateImg"
                src={product?.img || DEFAULT_IMG_URL}
                alt=""
              />
              <label htmlFor="file">
                <Publish className="productUpdateIcon" />
              </label>
              <input multiple type="file" 
                name="file" id="file"
                style={{ display: "none" }}
                onChange={(e) => setUpdatedProductPic(e.target.files)}
              />
            </div>
            {
              uploaded === 1 ? (
                <button className="productUpdateButton" onClick={handleUpdate}>Update</button>
              ) : (
                <button className="productUpdateButton" onClick={handleUpload}>Upload</button>
              )
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProductUpdate;