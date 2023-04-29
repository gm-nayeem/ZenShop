import './newUser.scss';
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { publicRequest } from '../../utils/makeRequest';
import upload from "../../config/upload";
import { userInputs } from '../../formSource';
import NO_IMG_ICON from "../../assets/no-image-icon.jpeg";


const NewUser = () => {
  const [file, setFile] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // set user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  };

  // sumbit user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      username, email, password, cpassword
    } = user;

    try {
      const url = await upload(file);

      const newUser = {
        username,
        email,
        password,
        cpassword,
        img: url,
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
            <button onClick={handleSubmit}>Upload</button>
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

