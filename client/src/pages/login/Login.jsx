import React, { useState } from 'react';
import './login.scss';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from "../../redux/apiCalls";


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passShow, setPassShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    login(dispatch, user);
    navigate('/');

    setUser({
      email: "",
      password: ""
    });
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={handleChange}
                name="email" id="email"
                placeholder='enter email'
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={handleChange}
                  value={user.password}
                  name="password" id="password"
                  placeholder='enter password'
                />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className='btn' onClick={handleSubmit}>Login</button>
            <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
            <p style={{ color: "black", fontWeight: "bold" }}>Forgot Password  <NavLink to="/password-reset">Click Here</NavLink> </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login;