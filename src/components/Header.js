import "../stylesheets/Header.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onLoginPage = (window.location.pathname === "/login");

  const handleTitleClick = () => {
    navigate("/");
  };
  const handleLoginClick = () => {
    navigate("/login");
    console.log(onLoginPage);
  };

  return (
    <div className="header">
      <div className="title" onClick={handleTitleClick}><p><span className="m">M</span>athLib</p></div>
      {!onLoginPage && (<button className="login-button" onClick={handleLoginClick}>Login</button>)}
    </div>
  )
}

export default Header;
