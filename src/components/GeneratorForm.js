import "../stylesheets/GeneratorForm.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MathJax } from "better-react-mathjax";
import { genArith, genLinear } from "../util/generatorFuncs";

const GeneratorForm = () => {
  const { register, handleSubmit } = useForm();

  const [problems, setProblems] = useState([]);
  
  const [hideSolutions, setSolutions] = useState(false);
  const toggleHideSolutions = () => setSolutions(!hideSolutions);

  const onSubmit = (data) => {
    console.log(data);
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
      <input onChange={toggleHideSolutions} type="checkbox"></input>
      <label>Hide solutions?</label>
    </form>
    {/* <button onClick={() => console.log(problems)}>State</button> */}
    <div className="generated-problems">
      {problems.map((problem, index) => (
        <div className="generated-problem" key={`problem${index}`}> 
          <h3>Problem {index+1}</h3>
          <p><MathJax>{`$${problem.problem}$`}</MathJax></p>
          {(!hideSolutions) && (<p>Solution&#40;s&#41;: {problem.solution}</p>)}
        </div>
      ))}
    </div>
    </>
  )
};

export default GeneratorForm;
