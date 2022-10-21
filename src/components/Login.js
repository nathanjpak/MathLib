import "../stylesheets/Login.css";  
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, getUsers, logout } from "../util/loginFuncs";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [ invalidCreds, setInvalidCreds ] = useState(false);

  const onSubmit = (data) => {
    login(data)
      .then((response) => {
        navigate("/");
      })
      // Error message should show up on screen
      .catch((err) => setInvalidCreds(true));
  }

  const handleClick = () => {
    getUsers();
  }
  
  const handleLogout = () => {
    logout();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="login-col-2">
        <h2 className="login-header">Login</h2>
        <label>Username</label>
        <input className="input-100" {...register("username")}/>
        <label>Password</label>
        <input className="input-100" type="password" {...register("password")}/>
        {invalidCreds && (<div className="login-error">Invalid username or password.</div>)}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClick}>Get users</button>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </form>
  )
};

export default Login;
