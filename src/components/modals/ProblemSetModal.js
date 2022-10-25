import "../../stylesheets/ProblemSetModal.css";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import PropTypes from "prop-types";

import { currentUserContext } from "../../currentUserContext";
import ProblemSetModalProblem from "./ProblemSetModalProblem";

const ProblemSetModal = ({isOpen, onClose, problems}) => {
  const { currentUser } = useContext(currentUserContext);

  const { register, handleSubmit, setValue } = useForm();
  setValue("setProblems", problems);

  const onSubmit = (data) => {
    console.dir(data);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={500}
      ariaHideApp={false}
      className={"problem-set-modal"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
        {currentUser && (<input {...register("name")} className="input-100" value={`Problem Set ${currentUser.problemSets.length + 1}`}/>)}
        
        <div className="problems-container">
          {problems.map((problem, index) => (
            <ProblemSetModalProblem key={index} problem={problem} index={index} />
          ))}
        </div>

        <div className="flex-row">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
};

export default ProblemSetModal;

ProblemSetModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  problems: PropTypes.array,
}
