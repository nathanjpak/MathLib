import axios from "axios";

export const genArith = (count, updateState) => {
  let problems = [];
  let queryString = "?";
  if (count) queryString = `${queryString}count=${count}`
  axios({
    method: "get",
    url: `/gen/arith${queryString}`,
    // url: "https://mathlib.cyclic.app/gen/arith",
  })
    .then((response) => {
      problems = response.data;
      updateState(problems);
    })
}

export const genLinear = (count, updateState) => {
  let problems = [];
  let queryString = "?";
  if (count) queryString = `${queryString}count=${count}`
  axios({
    method: "get",
    url: `/gen/alg/linear${queryString}`,
    // url: "https://repulsive-calf-gabardine.cyclic.app/gen/alg/linear",
  })
    .then((response) => {
      problems = response.data;
      updateState(problems);
    })
}
