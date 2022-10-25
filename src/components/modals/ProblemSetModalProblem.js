import React from "react";
import PropTypes from "prop-types";

const ProblemSetModalProblem = ({ problem, index, register, onChange }) => {


  return (
    <div key={`Problem-${index}`}>
      <label> Problem {" "} {index+1}
        <input type="checkbox" defaultChecked={true} value={problem} onChange={() => onChange(index)} />
        <span />
      </label>
    </div>
  )
};

export default ProblemSetModalProblem;

ProblemSetModalProblem.propTypes = {
  problem: PropTypes.object,
  index: PropTypes.number,
  register: PropTypes.func,
  onChange: PropTypes.func,
}
