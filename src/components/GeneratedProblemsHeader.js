import React, { useContext } from "react";
import PropTypes from "prop-types";

import { currentUserContext } from "../currentUserContext";

const GeneratedProblemsHeader = ({handleSaveClick}) => {
  const { currentUser } = useContext(currentUserContext);

  return (
      <div className="generated-problems-header">
        {currentUser && (<button className="button-secondary" onClick={handleSaveClick}>Save Problem Set</button>)}   
        {!currentUser && (<div>Log in to save problem sets!</div>)}    
      </div>
  )
}

export default GeneratedProblemsHeader;

GeneratedProblemsHeader.propTypes = {
  handleSaveClick: PropTypes.func,
}
