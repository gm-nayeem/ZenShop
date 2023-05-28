import './newUser.scss';
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { publicRequest } from '../../utils/makeRequest';
import { userInputs } from '../../formSource';
// firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../config/firebase";
const NO_IMG_ICON_URL = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

const NewUser = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const navigate = useNavigate();

  // set user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  };

  // file upload using firebase
  const handleUpload = (e) => {
    e.preventDefault();

    setFileLoading(true);

    // firebase setup
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);

    const storageRef = ref(storage, `/users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          setUser(prev => {
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

  // sumbit user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      username, email, password, cpassword, profilePic
    } = user;

    try {
      const newUser = {
        username,
        email,
        password,
        cpassword,
        profilePic
      };

      const res = await publicRequest.post("/auth/register", newUser);
      res && navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='new'>
      <div className="top">
        <h1>ADD NEW USER</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="leftWrapper">
            <img
              src={
                file ? URL.createObjectURL(file) : NO_IMG_ICON
              }
              alt=""
            />
            {
              fileLoading ? (
                <button className="userUpdateButton">Uploading...</button>
              ) : uploaded === 1 ? (
                <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
              ) : (
                <button className="userUpdateButton" onClick={handleUpload}>Upload</button>
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
              <input type="file" name="file" id='file'
                style={{ display: "none" }}
                onChange={e => setFile(e.target.files[0])}
              />
            </div>
            {
              userInputs.map((input, i) => (
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewUser;

