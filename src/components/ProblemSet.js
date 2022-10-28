import "../stylesheets/ProblemSet.css";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Problem from "./ProblemOnSet";
import ProblemSetEditModal from "./modals/ProblemSetEditModal";

import { currentUserContext } from "../currentUserContext";

import { fetchProblemSet, deleteProblemSet } from "../util/problemSetFuncs";
import { fetchUser } from "../util/contextFuncs";

const ProblemSet = () => {
  const urlArray = window.location.pathname.split("/");

  const navigate = useNavigate();

  const [ currentSet, setCurrentSet ] = useState({});
  useEffect(() => {
    fetchProblemSet(urlArray[2])
      .then((res) => {
        setCurrentSet(res.data);
      })
  }, [urlArray])

  const [ editIsOpen, setEditIsOpen ] = useState(false);
  const toggleEditIsOpen = () => setEditIsOpen(!editIsOpen);

  const { currentUser, setCurrentUser } = useContext(currentUserContext);

  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure you want to delete this set?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProblemSet(currentSet._id, currentUser._id)
          .then(() => {
            fetchUser()
              .then((res) => {
                setCurrentUser(res.data);
                navigate("/");
              })
          })
      };
    })
  }

  return (
    <div className="flex-col grid-main-body">
      <div className="flex-row">
        <h2>{currentSet.name}</h2>
        {currentUser && (currentUser._id === currentSet.owner) && (<div className="flex-row">
          <button onClick={toggleEditIsOpen}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>)}
      </div>
      <div className="problem-set-container">
        {(currentSet.problems || []).map((problem, index) => (
          <Problem key={index} problem={problem} index={index} />
        ))}
      </div>
      {(Object.keys(currentSet).length > 1) && <ProblemSetEditModal 
        isOpen={editIsOpen}
        onRequestClose={toggleEditIsOpen}  
        name={currentSet.name}
        problems={currentSet.problems}
        setCurrentSet={setCurrentSet}
        setId={currentSet._id}
      />}
    </div>    
  )
};

export default ProblemSet;
