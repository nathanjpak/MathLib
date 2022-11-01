import "../stylesheets/Problem.css";
import React, { useState } from "react";
import { MathJax } from "better-react-mathjax";
import PropTypes from "prop-types";

const Problem = ({ problem, index }) => {
  const [showSolution, setShowSolution] = useState(false);
  const toggleShowSolution = () => setShowSolution(!showSolution);

  return (
    <div className="generated-problem">
      <div className="problemTopRow">
        <h3>Problem {index+1}</h3>
        {!showSolution && (
        <button className="button-tertiary" onClick={toggleShowSolution}>Show Solution(s)</button>
        )}
        {showSolution && (
          <button className="button-tertiary" onClick={toggleShowSolution}>Hide Solution(s)</button> 
        )}
      </div> 
      <p><MathJax>{`$${problem.problem}$`}</MathJax></p>
      
      {showSolution && (<p>Solution&#40;s&#41;: {problem.solution}</p>)}
    </div>
  )
}

export default Problem;

Problem.propTypes = {
  problem: PropTypes.object,
  index: PropTypes.number,
}
