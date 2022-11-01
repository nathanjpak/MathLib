import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";

import { signup, login } from "../util/loginFuncs";

import { currentUserContext } from "../currentUserContext";

const SignUp = () => {
  const { register, formState: {errors}, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(currentUserContext);

  const onSubmit = (data) => {
    signup(data)
      .then((response) => {
        login({ username: data.username, password: data.password })
        setCurrentUser(response.data);
        navigate("/");
      })
      .catch(() => alert("Error with sign up. Username or email already exists."));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div >
        <h2>Create an Account</h2>
        <label>Username</label>
        <input className="input login-field" {...register("username", {
          required: "This field is required",
          minLength: {
            value: 6,
            message: "Username must be at least 6 characters!"
          },
          maxLength: {
            value: 30,
            message: "Username must be fewer than 31 characters!"
          },
          pattern: {
            value: /^[A-Za-z0-9]{6,30}$/,
            message: "Username cannot contain special characters."
          }
        }) } />
        <ErrorMessage errors={errors} name="username" render={({message}) => <p>{message}</p>}/>
        
        <label>Email</label>
        <input className="input login-field" type="email" {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email."
          },
        })}/>
        <ErrorMessage errors={errors} name="email" render={({message}) => <p>{message}</p>}/>
        
        <label>Password</label>
        <input className="input login-field" type="password" {...register("password", {
          required: "This field is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters."
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message: "Invalid password. Must contain at least 1 uppercase letter, 1 lowercase letter and 1 number."
          }
        })} />
        <ErrorMessage errors={errors} name="password" render={({message}) => <p>{message}</p>}/>
        
        <label>Confirm Password</label>
        <input className="input login-field" type="password" {...register("confirmPassword", {
          required: "This field is required",
          validate: value => value === watch("password") || "Passwords do not match"
        })} />
        <ErrorMessage errors={errors} name="confirmPassword" render={({message}) => <p>{message}</p>}/>
        
        <button type="submit" className="button-primary">Create account</button>
      </div>
    </form>
  )
}

export default SignUp;
