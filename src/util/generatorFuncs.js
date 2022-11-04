import axios from "axios";
import { nanoid } from "nanoid";

const API_ENDPOINT = process.env.REACT_APP_GEN_API_ENDPOINT || "https://mathlib.cyclic.app";

export const genArith = (count, setLoading, updateState) => {
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
      for (let problem of problems) {
        problem.id = nanoid();
      }
      updateState(problems);
    })
    .finally(setLoading(false))
}

export const genLinear = (count, setLoading, updateState) => {
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
      for (let problem of problems) {
        problem.id = nanoid();
      }
      updateState(problems);
    })
    .finally(setLoading(false))
}
