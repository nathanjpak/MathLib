import React from "react";
import PropTypes from "prop-types";

// styling is found in Header.css;

const SettingsDropdown = ({handleThemeChange}) => {

  return (
    <div className="settings">
      <label>Select Theme</label>
      <select className="input input-settings" onChange={handleThemeChange}>
        <option id="option-default" value={""}>Default</option>
        <option id="option-cookie" value={"cookie"}>Cookie</option>
      </select>
    </div>
  )
}

export default SettingsDropdown;

SettingsDropdown.propTypes = {
  handleThemeChange: PropTypes.func,
}
