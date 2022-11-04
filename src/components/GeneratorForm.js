import "../stylesheets/GeneratorForm.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { genArith, genLinear } from "../util/generatorFuncs";

import Problem from "./ProblemOnGenerator";
import GeneratedProblemHeader from "./GeneratedProblemsHeader";
// import ProblemSetModal from "./ProblemSetModal";
import ProblemSetModal from "./modals/ProblemSetModal";

const GeneratorForm = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  const onSubmit = (data) => {
    setLoading(true);
    const { topic, problemsCount } = data;
    switch (topic) {
      case "linearEquations":
        genLinear(problemsCount, setLoading, setProblems);
        break;
      default:
        genArith(problemsCount, setLoading, setProblems);
    }
  };

  // let problemsCount = getValues("problemsCount");
  const incrementCount = () => {
    let problemsCount = getValues("problemsCount") || 20;
    setValue("problemsCount", parseInt(problemsCount)+1);
  }
  const decrementCount = () => {
    let problemsCount = getValues("problemsCount") || 20;
    setValue("problemsCount", parseInt(problemsCount)-1);
  }

  return (
    <>
    <form className="main-form" 
      onSubmit={handleSubmit(onSubmit)}>

      <div className="input generator-field generator-message">
        {(!loading) && (
          <span>Welcome</span>
        )}
        {(loading) && (
          <span>Generating...</span>
        )}
      </div>

      <div className="form-div-50">
        <label htmlFor="topic">Topic</label>
        <select className="input generator-field" id="topic" {...register("topic")}>
          <option value="arithmetic">Arithmetic</option>
          <option value="linearEquations">Linear Equations</option>
        </select>
        <label htmlFor="problemsCount">Number of Problems</label>
        <div style={{display: "flex", gap: "2%"}}>
          <input 
            className="input generator-field" 
            {...register("problemsCount", { min: 1, max: 100 })} 
            type="number" 
            placeholder="Default: 20"
            style={{width: "50%"}}
          />
          <div className="number-buttons">
            <button className="button-secondary" style={{flexGrow: 1}} type="button" onClick={incrementCount}><strong>+</strong></button>
            <button className="button-secondary" style={{flexGrow: 1}} type="button" onClick={decrementCount}><strong>-</strong></button>
          </div>
        </div>
      </div>

      <div className="form-div-50">
        <label>Filters</label>
        <div className="input generator-field">
          Coming Soon <br />
          {""} <br />
          {""} <br />
          {""} <br />
        </div>
      </div>

      
      
      <button className="generator-button" type="submit" disabled={loading}>GENERATE</button>
    </form>
    <div className="generated-problems">
      {problems.length>0 && <GeneratedProblemHeader handleSaveClick={toggleIsModalOpen} />}
      {problems.map((problem, index) => (
        <Problem key={`problem-${index}`} problem={problem} index={index} />
      ))}
    </div>
    <ProblemSetModal
      isOpen={isModalOpen}
      onClose={toggleIsModalOpen}
      problems={problems}
    />
    </>
  )
};

export default GeneratorForm;
