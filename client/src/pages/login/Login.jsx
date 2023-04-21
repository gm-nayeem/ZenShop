import React, { useState } from 'react';
import './login.scss';
import { NavLink, useNavigate } from "react-router-dom"
// import { publicRequest } from '../../utils/request'; 

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inpval);
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
                value={inpval.email}
                onChange={setVal}
                name="email" id="email"
                placeholder='Enter Your Email Address'
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password" id="password"
                  placeholder='Enter Your password'
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