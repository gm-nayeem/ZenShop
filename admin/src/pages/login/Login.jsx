import { useState } from "react";
import "./login.css";
import {useDispatch} from 'react-redux';
import { login } from "../../redux/authRedux/authApiCalls";
import {Link} from 'react-router-dom';
// import { mobile } from "../responsive";


const Login = () => {
  const [user, setUser] = useState({email: "", password: ""});
  const {email, password} = user;

  const dispatch = useDispatch();
  // const {isFetching, isError} = useSelector(state => state.admin);

  const userHandler = (e) => {
    const {name, value} = e.target;
    setUser(
      {...user, [name]: value}
    );
  }

  const handleClick = (e) => {
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
            required onChange={userHandler}        
          />
          <input placeholder="password" type="password" name="password" value={password} 
            required onChange={userHandler} 
          />
          <button className="loginButton" onClick={handleClick}>
            LOGIN
          </button>
          {/* {
            isError && <p className="loginFormError">Something went wrong...</p>
          } */}
          <Link className="link">
            <p className="loginFormLink">DO NOT YOU REMEMBER THE PASSWORD?</p>
          </Link>
          <Link className="link">
            <p className="loginFormLink">CREATE A NEW ACCOUNT</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
