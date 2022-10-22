import React from "react";
// import { useForm } from "react-hook-form";
import Modal from "react-modal";
import PropTypes from "prop-types";

const ProblemSetModal = ({isOpen, onClose, problems}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      Hello!
    </Modal>
  )
};

export default ProblemSetModal;

ProblemSetModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  problems: PropTypes.array,
}
