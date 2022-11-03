import "../stylesheets/Header.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { currentUserContext, themeContext } from "../Context";
import ProfileDropdown from "./ProfileDropdown";
import SettingsModal from "./modals/SettingsModal";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(currentUserContext);
  const { setTheme } = useContext(themeContext);

  const onLoginPage = (window.location.pathname === "/login");

  const [ settingsIsOpen, setSettingsIsOpen ] = useState(false);

  const handleTitleClick = () => {
    navigate("/");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  }

  return (
    <>
    <div className="header">
      <button className="button-settings" onClick={() => setSettingsIsOpen(!settingsIsOpen)}>
        <span className="span-settings-icon">{'\u2699'}</span>
        <span className="span-settings">Settings</span>
        </button>
      <div className="title" onClick={handleTitleClick} style={{cursor: "pointer"}}><p><span className="m">M</span>athLib</p></div>
      {!onLoginPage && !currentUser && (<button className="button-primary login-button" onClick={handleLoginClick}>Login</button>)}
      {currentUser && (<ProfileDropdown />)}
    </div>
    <SettingsModal
      isOpen={settingsIsOpen}
      onRequestClose={() => setSettingsIsOpen(false)}
      handleThemeChange={handleThemeChange}
    />
    </>
  )
}

export default Header;
