import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_GEN_API_ENDPOINT || "https://mathlib.cyclic.app";

export const genArith = (count, updateState) => {
  let problems = [];
  updateState(problems);
  let queryString = "?";
  if (count) queryString = `${queryString}count=${count}`
  axios({
    method: "get",
    url: `${API_ENDPOINT}/gen/arith${queryString}`,
    withCredentials: false,
  })
    .then((response) => {
      problems = response.data;
      updateState(problems);
    })
}

export const genLinear = (count, updateState) => {
  let problems = [];
  updateState(problems);
  let queryString = "?";
  if (count) queryString = `${queryString}count=${count}`
  axios({
    method: "get",
    url: `${API_ENDPOINT}/gen/alg/linear${queryString}`,
    withCredentials: false,
  })
    .then((response) => {
      problems = response.data;
      updateState(problems);
    })
}
