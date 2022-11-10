import React, { useState, useEffect } from "react";
import { capitalizeFirst } from "../util/randomFuncs";
import PropTypes from "prop-types";

const FilterOptions = ({ filter, register, getValues, setValue }) => {
  const type = filter.type;
  const ref = `filters.${filter.name}`;

  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    const defaultValue = getValues(ref) || "";
    setCurrentValue(defaultValue);
  }, [ref, getValues]);

  const handleNumberChange = (event) => {
    setCurrentValue(event.target.value);
    setValue(ref, event.target.value);
  }

  const incrementNumber = () => { 
    let newValue = currentValue + 1;
    if (newValue > filter.max) newValue = filter.max;
    setCurrentValue(newValue);
    setValue(ref, newValue);
  }
  const decrementNumber = () => {
    let newValue = currentValue - 1;
    if (newValue < filter.min) newValue = filter.min;
    setCurrentValue(newValue);
    setValue(ref, newValue);
  }

  switch (type) {
    case "checkbox":
      return filter.list.map((option) => {
        return (
          <label   htmlFor={option} key={option+"label"}>
            <span>{capitalizeFirst(option)}</span>
            <input id={option} key={option} name={option} value={option} type="checkbox" defaultChecked={true} 
            {...register(ref)}
            />
          </ label>
        )
      })
    // Default case is "number"
    default:
      return (
        <div className="flex-row" style={{gap: "4px"}}>
          <input onChange={ handleNumberChange } value={currentValue} className="input generator-field" type="number" placeholder={`Default: ${filter.default}`} 
            {...register(ref, {
              min: filter.min, max: filter.max,
              onChange: (e) => handleNumberChange(e)
            })} 
          />
          <button type="button" onClick={incrementNumber} className="button-screen">+</button>
          <button type="button" onClick={decrementNumber} className="button-screen">-</button>
        </div>
        
      )
  }
}

const GeneratorFilters = ({ filters, index, setIndex, register, getValues, setValue }) => {
  const incrementIndex = () => {
    (index + 1 === filters.length) ? setIndex(0) : setIndex(index + 1);
  }

  return (
    <div className="form-div-50">
      <div className="flex-row">
        <span>Filters</span>
        <button onClick={incrementIndex} type="button" className="button-secondary">Next</button>
      </div>
      <label className="input generator-field">{capitalizeFirst(filters[index].name)}</label>
      <div className="input generator-field">
        <FilterOptions filter={filters[index]} register={register} getValues={getValues} setValue={setValue} />
      </div>
    </div>
  )
};

export default GeneratorFilters;

GeneratorFilters.propTypes = {
  filters: PropTypes.array,
  index: PropTypes.number,
  setIndex: PropTypes.func,
  register: PropTypes.func,
  getValues: PropTypes.func,
  setValue: PropTypes.func,
}

FilterOptions.propTypes = {
  filter: PropTypes.object,
  register: PropTypes.func,
  getValues: PropTypes.func,
  setValue: PropTypes.func,
}
