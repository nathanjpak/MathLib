import "../../stylesheets/ProblemSetModal.css";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { currentUserContext } from "../../currentUserContext";
import ProblemSetModalProblem from "./ProblemSetModalProblem";
import { createProblemSet } from "../../util/problemSetFuncs";

const ProblemSetModal = ({isOpen, onClose, problems}) => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);

  const navigate = useNavigate();

  const { register, handleSubmit, setValue, getValues } = useForm();
  setValue("setProblems", problems);
  const updateSetProblems = (index) => {
    let problemId = problems[index].id;
    let setProblemValues = getValues("setProblems");
    const foundIndex = setProblemValues.findIndex(problem => problem.id === problemId);
    (foundIndex === -1) ? setProblemValues.push(problems[index]) : setProblemValues.splice(foundIndex, 1);
  }

  const onSubmit = (data) => {
    createProblemSet(data, currentUser._id)
      .then((response) => {
        setCurrentUser(response.data.user);
        navigate(`/s/${response.data.problemSet._id}`);
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={500}
      ariaHideApp={false}
      className={"problem-set-modal"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col" style={{gap: "1em"}}>
        {currentUser && (<input {...register("name")} className="input login-field" defaultValue={`Problem Set ${currentUser.problemSets.length + 1}`}/>)}
        
        <div className="problems-container">
          {problems.map((problem, index) => (
            <ProblemSetModalProblem key={index} problem={problem} index={index} onChange={updateSetProblems} />
          ))}
        </div>

        <div className="flex-row" style={{marginTop: `calc(1em + 4px)`}}>
          <button className="button-tertiary" type="button" onClick={onClose}>Cancel</button>
          <button className="button-accept" type="submit">Save</button>
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
