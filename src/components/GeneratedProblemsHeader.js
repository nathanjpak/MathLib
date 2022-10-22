import React from "react";
import PropTypes from "prop-types";

const GeneratedProblemsHeader = ({handleSaveClick}) => {
 
  return (
      <div className="generated-problems-header">
        <button onClick={handleSaveClick}>Save Problem Set</button>       
      </div>
  )
}

export default GeneratedProblemsHeader;

GeneratedProblemsHeader.propTypes = {
  handleSaveClick: PropTypes.func,
}
