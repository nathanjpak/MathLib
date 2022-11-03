import React from "react";
import Modal from "react-modal"
import PropTypes from "prop-types";

const SettingsModal = ({isOpen, onRequestClose, handleThemeChange}) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="settings"
      overlayClassName="settings-overlay"
      // appElement={document.getElementById("root")}
      ariaHideApp={false}
      closeTimeoutMS={250}
    >
      <label>Select Theme</label>
      <select className="input input-settings" onChange={handleThemeChange}>
        <option id="option-default" value={""}>Default</option>
        <option id="option-cookie" value={"cookie"}>Cookie</option>
      </select>
    </Modal>
  )
}

export default SettingsModal;

SettingsModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  handleThemeChange: PropTypes.func,
}