import "../stylesheets/GeneratorForm.css";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { genArith, genLinear } from "../util/generatorFuncs";

import Problem from "./Problem";
import GeneratedProblemHeader from "./GeneratedProblemsHeader";
import ProblemSetModal from "./ProblemSetModal";

const GeneratorForm = () => {
  const { register, handleSubmit } = useForm();

  const [problems, setProblems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  const onSubmit = (data) => {
    // console.log(data);
    const { topic, problemsCount } = data;
    switch (topic) {
      case "linearEquations":
        genLinear(problemsCount, setProblems);
        break;
      default:
        genArith(problemsCount, setProblems);
    }
  };

  return (
    <>
    <form className="main-form" 
      onSubmit={handleSubmit(onSubmit)}>

      <div className="form-div-50">
        <label htmlFor="topic">Topic</label>
        <select className="input-100" id="topic" {...register("topic")}>
          <option value="arithmetic">Arithmetic</option>
          <option value="linearEquations">Linear Equations</option>
        </select>
      </div>
      
      <label htmlFor="problemsCount">Number of Problems</label>
      <input className="input-100" {...register("problemsCount", { min: 1, max: 100 })} type="number" placeholder="Default: 20" />
      <button className="generate-button" type="submit">Generate</button>
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
