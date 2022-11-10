import "../stylesheets/GeneratorForm.css";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

import { generateProblems } from "../util/generatorFuncs";

import Problem from "./ProblemOnGenerator";
import GeneratedProblemHeader from "./GeneratedProblemsHeader";
import ProblemSetModal from "./modals/ProblemSetModal";
import GeneratorFilters from "./GeneratorFilters";

const genData = require("../data/generator.json");
const topics = Object.keys(genData);

const GeneratorForm = () => {
  const { register, handleSubmit, setValue, getValues } = useForm({ defaultValues: { filters: {} } });

  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  // For rendering filters field
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [index, setIndex] = useState(0);
  const filters = genData[selectedTopic].filters;

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    setIndex(0);
  }

  // reset 'filters' in form when topic is changed
  useEffect(() => {
    // First clear filters
    setValue("filters", {});
    // Then set defaults
    filters.forEach((filter) => {
      setValue(`filters.${filter.name}`, filter.default)
    });
  }, [filters, setValue])

  // Handling Submit
  const onSubmit = (data) => {
    // console.log(data);
    setLoading(true);
    // May need to initially clear problems to properly render MathJax
    setProblems([]);
    const { topic, problemsCount, filters } = data;
    generateProblems(topic, problemsCount, filters)
      .then((response) => {
        let problems = response.data;
        for (let problem of problems) {
          problem.id = nanoid();
        }
        setProblems(problems);
      })
      .finally(() => setLoading(false))
  };

  // For incrementing/decrementing problemsCount in form
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
        {!loading && (
          <span>Welcome</span>
        )}
        {loading && (
          <span>Generating...</span>
        )}
      </div>

      <div className="form-div-50">
        <label htmlFor="topic">Topic</label>
        <select className="input generator-field" id="topic" {...register("topic", {
          onChange: (e) => handleTopicChange(e)
        })}>
          {topics.map(topic => {
            return (
              <option value={topic} key={topic} id={topic}>{topic}</option>
            )
          })}
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

      <GeneratorFilters filters={filters} index={index} setIndex={setIndex} register={register} getValues={getValues} setValue={setValue} />
      
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
