import React, { useState } from 'react'
import './register.scss';
import { NavLink } from "react-router-dom"
// import { publicRequest } from '../../utils/request';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: ""
  });

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
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text" name="fname" id="fname"
                value={inpval.fname}
                placeholder='Enter Your Name'
                onChange={setVal}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email" name="email" id="email"
                value={inpval.email}
                placeholder='Enter Your Email Address'
                onChange={setVal}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={inpval.password}
                  onChange={setVal}
                  name="password" id="password"
                  placeholder='Enter Your password'
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
                  value={inpval.cpassword}
                  onChange={setVal}
                  name="cpassword" id="cpassword"
                  placeholder='Confirm password'
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