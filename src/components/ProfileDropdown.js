import "../stylesheets/ProfileDropdown.css";
import { ReactComponent as DownArrow } from "../icons/angle-small-down.svg";
import { ReactComponent as UpArrow } from "../icons/angle-small-up.svg";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { currentUserContext } from "../currentUserContext";

import { logout } from "../util/loginFuncs";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [ showMenu, setShowMenu ] = useState(false);
  const toggleShowMenu = () => setShowMenu(!showMenu);

  const handleLogoutClick = () => {
    logout()
      .then(() => {
        setCurrentUser(null);
        navigate("/login");
      })
  }

  const displayName = currentUser.firstName || currentUser.username || currentUser.email;

  return (
    <>
      <button className="login-button" style={{display: "flex", alignItems: "center"}} onClick={toggleShowMenu}>
        <span style={{}}>{displayName}</span>
        {!showMenu && <DownArrow style={{width: "28px", height: "28px", fill: "white"}}/>}
        {showMenu && <UpArrow style={{width: "28px", height: "28px", fill: "white"}}/>}
      </button>
      {showMenu && (<div className="dropdown-menu">
        <button className="dropdown-menu-button">Your Problem Sets</button>
        <button className="dropdown-menu-button">Account Settings</button>
        <button onClick={handleLogoutClick} className="logout-button">Logout</button>
      </div>)}
    </>
  )
}

export default ProfileDropdown;
