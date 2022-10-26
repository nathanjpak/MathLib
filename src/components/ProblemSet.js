import "../stylesheets/ProblemSet.css";
import React, { useEffect, useState } from "react";

import Problem from "./ProblemOnSet";

import { fetchProblemSet } from "../util/problemSetFuncs";

const ProblemSet = () => {
  const urlArray = window.location.pathname.split("/");

  const [ currentSet, setCurrentSet ] = useState([]);
  useEffect(() => {
    fetchProblemSet(urlArray[2])
      .then((res) => {
        setCurrentSet(res.data);
      })
  }, [urlArray])

  return (
    <div className="flex-col grid-main-body">
      <div>
        <h2>{currentSet.name}</h2>
      </div>
      <div className="problem-set-container">
        {(currentSet.problems || []).map((problem, index) => (
          <Problem key={index} problem={problem} index={index} />
        ))}
      </div>
    </div>
    
  )
};

export default ProblemSet;
