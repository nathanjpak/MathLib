import React from "react";
import PropTypes from "prop-types";

const ProblemSetModalProblem = ({ problem, index, register }) => {
  
  return (
    <div key={`Problem-${index}`}>
      <label> Problem {" "} {index}
        <input type="checkbox" defaultChecked={true} value={problem} />
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
}
