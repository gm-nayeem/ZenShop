import React, { useState } from 'react'
import './register.scss';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/apiCalls';

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: ""
  });
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser(() => {
      return {
        ...user,
        [name]: value
      }
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(user);
    navigate('/login');

    setUser({
      username: "",
      email: "",
      password: "",
      cpassword: ""
    });
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="username">Username</label>
              <input
                type="text" name="username" id="username"
                value={user.username}
                placeholder='enter username'
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email" name="email" id="email"
                value={user.email}
                placeholder='enter email'
                onChange={handleChange}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={user.password}
                  onChange={handleChange}
                  name="password" id="password"
                  placeholder='enter password'
                />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  value={user.cpassword}
                  onChange={handleChange}
                  name="cpassword" id="cpassword"
                  placeholder='confirm password'
                />
                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className='btn' onClick={handleSubmit}>Sign Up</button>
            <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register;