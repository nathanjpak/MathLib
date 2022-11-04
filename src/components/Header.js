import "../stylesheets/Header.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { currentUserContext, themeContext } from "../Context";

import ProfileDropdown from "./ProfileDropdown";
import ClickDetectWrapper from "./modals/ClickDetectWrapper";
import SettingsDropdown from "./modals/SettingsDropdown";

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

  const clickDetectCallback = (event) => {
    const target = event.path[0].id;
    if (!(target === "settings-span" || target === "settings-icon" || target === "settings-button")) {
      setSettingsIsOpen(false);
    }
  }

  return (
    <>
    <div className="header">
      <button id="settings-button" className="button-settings" onClick={() => setSettingsIsOpen(!settingsIsOpen)}>
        <span id="settings-icon" className="span-settings-icon">{'\u2699'}</span>
        <span id="settings-span" className="span-settings">Settings</span>
      </button>
      <div className="title" onClick={handleTitleClick} style={{cursor: "pointer"}}><p><span className="m">M</span>athLib</p></div>
      {!onLoginPage && !currentUser && (<button className="button-primary login-button" onClick={handleLoginClick}>Login</button>)}
      {currentUser && (<ProfileDropdown />)}
      {settingsIsOpen && (
        <ClickDetectWrapper callback={clickDetectCallback}>
          <SettingsDropdown handleThemeChange={handleThemeChange}/>
        </ClickDetectWrapper>
      )}
    </div>
    </>
  )
}

export default Header;
