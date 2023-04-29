import React, { useEffect, useState } from 'react'
import './userUpdate.scss';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Publish } from "@mui/icons-material";
import { updateUser } from "../../redux/userRedux/userApiCalls";
import { DEFAULT_IMG_URL } from '../../private/URL';
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from '../../config/firebase';


const UserUpdate = ({ user }) => {
  const [updatedUser, setUpdatedUser] = useState({});
  const [updatedProfilePic, setUpdatedProfilePic] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({
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
          setUpdatedUser(prev => {
            return {
              ...prev,
              "profilePic": downloadURL
            }
          });

          setFileLoading(false);
          setUploaded(prev => prev + 1);
        });
      }
    );
  };

  // handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    const sendUser = {
      ...user,
      ...updatedUser
    }

    updateUser(dispatch, sendUser._id, sendUser);

    setTimeout(() => {
      navigate("/users");
    }, 1000);
  }


  return (
    <div className="userUpdate">
      <span className="userUpdateTitle">Edit</span>
      <form className="userUpdateForm">
        <div className="userUpdateLeft">
          <div className="userUpdateItem">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder={user?.username}
              className="userUpdateInput"
              required
              onChange={handleChange}
            />
          </div>
          <div className="userUpdateItem">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder={user?.email}
              className="userUpdateInput"
              required
              onChange={handleChange}
            />
          </div>
          <div className="userUpdateItem">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder={user?.phone || "+8880 1728 276823"}
              className="userUpdateInput"
            />
          </div>
        </div>
        <div className="userUpdateRight">
          <div className="userUpdateUpload">
            <img
              className="userUpdateImg"
              src={user?.profilePic || DEFAULT_IMG_URL}
              alt=""
            />
            <label htmlFor="file">
              <Publish className="userUpdateIcon" />
            </label>
            <input type="file" name="file" id="file"
              style={{ display: "none" }}
              onChange={(e) => setUpdatedProfilePic(e.target.files[0])}
            />
          </div>
          {
            fileLoading ? (
              <button className="userUpdateButton">Uploading...</button>
            ) : uploaded === 1 ? (
              <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
            ) : (
              <button className="userUpdateButton" onClick={handleUpload}>Upload</button>
            )
          }
        </div>
      </form>
    </div>
  )
}

export default UserUpdate;