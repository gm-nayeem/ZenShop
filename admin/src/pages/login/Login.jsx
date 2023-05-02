import { useState } from "react";
import "./login.css";
import {useDispatch} from 'react-redux';
import { login } from "../../redux/apiCalls";
import {Link} from 'react-router-dom';
// import { mobile } from "../responsive";


const Login = () => {
  const [user, setUser] = useState({email: "", password: ""});
  const {email, password} = user;

  const dispatch = useDispatch();
  // const {isFetching, isError} = useSelector(state => state.admin);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(
      {...user, [name]: value}
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    login(dispatch, {email, password});

    setUser({
      email: "",
      password: ""
    });
  }


  return (
    <div className="login">
      <div className="loginWrapper">
        <h1 className="loginTitle">SIGN IN</h1>
        <form className="loginForm">
          <input type="email" placeholder="email" value={email} name="email" 
            required onChange={handleChange}        
          />
          <input placeholder="password" type="password" name="password" value={password} 
            required onChange={handleChange} 
          />
          <button className="loginButton" onClick={handleSubmit}>
            LOGIN
          </button>
          {/* {
            isError && <p className="loginFormError">Something went wrong...</p>
          } */}
        </form>
      </div>
    </div>
  );
};

export default Login;
