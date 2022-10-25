import "../../stylesheets/ProblemSetModal.css";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
// import { nanoid } from "nanoid";
import PropTypes from "prop-types";

import { currentUserContext } from "../../currentUserContext";
import ProblemSetModalProblem from "./ProblemSetModalProblem";

const ProblemSetModal = ({isOpen, onClose, problems}) => {
  const { currentUser } = useContext(currentUserContext);

  // add ids to problems
  // for (let problem of problems) {
  //   problem.id = nanoid();
  // }

  const { register, handleSubmit, setValue, getValues } = useForm();
  setValue("setProblems", problems);
  const updateSetProblems = (index) => {
    let problemId = problems[index].id;
    let setProblemValues = getValues("setProblems");
    const foundIndex = setProblemValues.findIndex(problem => problem.id === problemId);
    (foundIndex === -1) ? setProblemValues.push(problems[index]) : setProblemValues.splice(foundIndex, 1);
    // setValue("setProblems", setProblemValues);
  }

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
            <ProblemSetModalProblem key={index} problem={problem} index={index} onChange={updateSetProblems} />
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
