import React, { useContext } from "react";
import PropTypes from "prop-types";

import { currentUserContext } from "../Context";

const GeneratedProblemsHeader = ({handleSaveClick}) => {
  const { currentUser } = useContext(currentUserContext);

  return (
      <div className="generated-problems-header">
        {currentUser && (<button className="button-secondary" onClick={handleSaveClick}>Save Problem Set</button>)}   
        {!currentUser && (<div style={{marginTop: "auto", marginBlock: "auto"}}>Log in to save problem sets!</div>)}    
      </div>
  )
}

export default GeneratedProblemsHeader;

GeneratedProblemsHeader.propTypes = {
  handleSaveClick: PropTypes.func,
}
