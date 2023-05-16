import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { updateProblemSet } from "../../util/problemSetFuncs";
import { fetchUser } from "../../util/contextFuncs";

import { currentUserContext } from "../../Context";

const ProblemSetEditModal = ({isOpen, onRequestClose, name, problems, setCurrentSet, setId}) => {
  const { register, handleSubmit, setValue } = useForm();

  const [setProblems, updateSetProblems] = useState(problems);

  const { setCurrentUser } = useContext(currentUserContext);

  useEffect(() => {
    setValue("setProblems", setProblems);
  }, [setProblems, setValue])

  const removeProblem = (problemId) => {
    let newSetProblems = [...setProblems];
    const foundIndex = setProblems.findIndex(problem => problem.id === problemId);
    newSetProblems.splice(foundIndex, 1);
    updateSetProblems(newSetProblems);
  }

  const onSubmit = (data) => {
    let submittedData = {problems: data.setProblems};
    // if name is changed, add to obj
    if (data.name !== name) submittedData.name = data.name;
    updateProblemSet(setId, submittedData)
      .then((response) => {
        if (response.data.updatedUser) {
          fetchUser()
            .then((res) => setCurrentUser(res.data));
        }
        setCurrentSet(response.data.updatedSet);
        onRequestClose();
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={500}
      ariaHideApp={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="input login-field" {...register("name")} defaultValue={name}/>
        <div>
          {setProblems.map((problem, index) => {
            return (<div className="problem-set-modal-problem" key={index} style={{color: "black"}}>
              {problem.problem}
              <button type="button" className="button-danger" onClick={() => removeProblem(problem.id)}>Remove</button>
            </div>)
          })}
        </div>
        <button className="button-accept" type="submit">Save changes</button>
        <button className="button-tertiary" type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  )
}

export default ProblemSetEditModal;

ProblemSetEditModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  name: PropTypes.string,
  problems: PropTypes.array,
  setCurrentSet: PropTypes.func,
  setId: PropTypes.string,
}
