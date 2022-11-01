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
  const [ showSets, setShowSets ] = useState(false);
  const toggleShowSets = () => setShowSets(!showSets);

  const handleLogoutClick = () => {
    logout()
      .then(() => {
        setCurrentUser(null);
        navigate("/login");
      })
  }

  const handleSetClick = (id) => {
    navigate(`/s/${id}`);
    toggleShowMenu();
    toggleShowSets();
  };

  const displayName = currentUser.firstName || currentUser.username || currentUser.email;

  return (
    <>
      <button className="button-primary login-button" style={{display: "flex", alignItems: "center"}} onClick={() => {
        toggleShowMenu();
        setShowSets(false);
      }}>
        <span>{displayName}</span>
        {!showMenu && <DownArrow className="dropdown-arrow-down" style={{width: "28px", height: "28px", fill: "white"}}/>}
        {showMenu && <UpArrow  className="dropdown-arrow-up" style={{width: "28px", height: "28px", fill: "white"}}/>}
      </button>
      {showMenu && (<div className="dropdown-menu">
        <button className="dropdown-menu-button button-secondary" onClick={toggleShowSets}>Your Problem Sets</button>
        <button className="dropdown-menu-button button-secondary" disabled={true}>Coming Soon</button>
        <button onClick={handleLogoutClick} className="logout-button button-tertiary">Logout</button>
      </div>)}
      {showSets && (<div className="set-dropdown-menu">
        {currentUser.problemSets.map(set => (
          <button key={set._id} onClick={ () => handleSetClick(set._id) } className="dropdown-menu-button button-secondary">{set.name}</button>
        ))}
        <button onClick={toggleShowSets} className="dropdown-menu-button button-secondary" style={{marginTop: "auto"}}>Back</button>
      </div>)}
    </>
  )
}

export default ProfileDropdown;
