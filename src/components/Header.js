import "../stylesheets/Header.css";
import React from "react";

const Header = () => {

  return (
    <div className="header">
      <div className="title"><p><span className="m">M</span>athLib</p></div>
      <button className="login-button">Login</button>
    </div>
  )
}

export default Header;
