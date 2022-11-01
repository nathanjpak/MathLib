import "../stylesheets/Header.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { currentUserContext } from "../currentUserContext";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);

  const onLoginPage = (window.location.pathname === "/login");

  const handleTitleClick = () => {
    navigate("/");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="title" onClick={handleTitleClick} style={{cursor: "pointer"}}><p><span className="m">M</span>athLib</p></div>
      {!onLoginPage && !currentUser && (<button className="button-primary login-button" onClick={handleLoginClick}>Login</button>)}
      {currentUser && (<ProfileDropdown />)}
    </div>
  )
}

export default Header;
