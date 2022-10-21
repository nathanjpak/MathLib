import "../stylesheets/Login.css";  
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { login } from "../util/loginFuncs";
import { fetchUser } from "../util/contextFuncs";

import { currentUserContext } from "../currentUserContext";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [ invalidCreds, setInvalidCreds ] = useState(false);
  const { currentUser, setCurrentUser } = useContext(currentUserContext);

  // useEffect(() => {
  //   if (currentUser) navigate("/");
  // }, [currentUser, navigate]);

  const onSubmit = (data) => {
    if (currentUser) {
      alert("Already Logged in!");
      navigate("/");
      return;
    }
    login(data)
      .then((response) => {
        fetchUser()
          .then((response) => {
            // console.log(response.data);
            setCurrentUser(response.data);
          })
          navigate("/");
      })
      // Error message should show up on screen
      .catch((err) => setInvalidCreds(true));
  }

  const handleAccountClick = () => {
    navigate("/signup");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="login-col-2">
        <h2 className="login-header">Login</h2>
        <label>Username</label>
        <input className="input-100" {...register("username")}/>
        <label>Password</label>
        <input className="input-100" type="password" {...register("password")}/>
        {invalidCreds && (<div className="login-error">Invalid username or password.</div>)}
        <div className="flex-row">
          <button type="submit" className="flex-no-grow">Submit</button>
          <button type="button" className="flex-no-grow" onClick={handleAccountClick}>Create an Account</button>
        </div>
        {/* <button type="button" onClick={handleClick}>Get users</button>
        <button type="button" onClick={handleLogout}>Logout</button> */}
      </div>
    </form>
  )
};

export default Login;
