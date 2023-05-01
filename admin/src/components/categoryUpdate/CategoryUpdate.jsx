import React, { useState } from 'react';
import './categoryUpdate.scss';
import { Publish } from "@mui/icons-material";
import { DEFAULT_IMG_URL } from "../../private/URL";
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../../utils/makeRequest';
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from '../../config/firebase';

const CategoryUpdate = ({ category }) => {
  const [updatedCategory, setUpdatedCategory] = useState({});
  const [updatedCategoryFile, setUpdatedCategoryFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(1);

  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // file upload using firebase
  const handleUpload = (e) => {
    e.preventDefault();

    setFileLoading(true);

    // firebase setup
    const fileName = new Date().getTime() + updatedProfilePic.name;
    const storage = getStorage(app);

    const storageRef = ref(storage, `/users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, updatedProfilePic);

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
          setUpdatedCategory(prev => {
            return {
              ...prev,
              "img": downloadURL
            }
          });

          setFileLoading(false);
          setUploaded(prev => prev + 1);
        });
      }
    );
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const sendCategory = {
      ...category,
      ...updatedCategory
    }
    
    // console.log("sendCategory", sendCategory);

    try {
      const res = await userRequest.put(`/categories/${category._id}`, sendCategory);
      res && navigate("/categories");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="categoryUpdate">
      <span className="categoryUpdateTitle">Edit</span>
      <form className="categoryUpdateForm">
        <div className="categoryUpdateLeft">
          <div className="categoryUpdateItem">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder={category?.title}
              className="categoryUpdateInput"
              required
              onChange={handleChange}
            />
          </div>
          <div className="categoryUpdateItem">
            <label>Description</label>
            <input
              type="text"
              name="desc"
              placeholder={category?.desc}
              className="categoryUpdateInput"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="categoryUpdateRight">
          <div className="categoryUpdateWrapper">
            <div className="categoryUpdateUpload">
              <img
                className="categoryUpdateImg"
                src={category?.img || DEFAULT_IMG_URL}
                alt=""
              />
              <label htmlFor="file">
                <Publish className="categoryUpdateIcon" />
              </label>
              <input type="file"
                name="file" id="file"
                style={{ display: "none" }}
                onChange={(e) => setUpdatedCategoryFile(e.target.files[0])}
              />
            </div>
            {
              fileLoading ? (
                <button className="categoryUpdateButton">Uploading...</button>
              ) : uploaded === 1 ? (
                <button className="categoryUpdateButton" onClick={handleUpdate}>Update</button>
              ) : (
                <button className="categoryUpdateButton" onClick={handleUpload}>Upload</button>
              )
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default CategoryUpdate;