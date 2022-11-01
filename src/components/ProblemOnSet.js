import React from "react";
import { MathJax } from "better-react-mathjax";
import PropTypes from "prop-types";

const Problem = ({ index, problem }) => {

  return (
    <div className="generated-problem">
      <h3>Problem {index+1}</h3>
      <p><MathJax>{`$${problem.problem}$`}</MathJax></p>
      <p>Solution: {problem.solution}</p>
    </div>
  )
};

export default Problem;

Problem.propTypes = {
  index: PropTypes.number,
  problem: PropTypes.object,
}
