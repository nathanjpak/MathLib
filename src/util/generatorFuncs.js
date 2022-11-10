import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_GEN_API_ENDPOINT || "https://mathlib.cyclic.app";

export const generateProblems = (topic, count, filters) => {

  // Build path
  let path = "";
  switch (topic) {
    case "Linear Equations":
      path="alg/linear"
      break;
    // Default case is "Arithmetic"
    default:
      path="arith"
  }

  // Build query string
  let queryString = "?";
  (count) ? queryString = `${queryString}count=${count}` : queryString = `${queryString}count=20`;
  for (let property in filters) {
    queryString = `${queryString}&${property}=${filters[property]}`;
  }

  return axios({
    method: "get",
    url: `${API_ENDPOINT}/gen/${path}${queryString}`,
    withCredentials: false,
  })
}


// export const genArith = (count, filters, setLoading, updateState) => {
//   let problems = [];
//   updateState(problems);

//   // building Query String
//   let queryString = "?";
//   (count) ? queryString = `${queryString}count=${count}` : queryString = `${queryString}count=20`;
//   for (let property in filters) {
//     queryString = `${queryString}&${property}=${filters[property]}`;
//   }

//   axios({
//     method: "get",
//     url: `${API_ENDPOINT}/gen/arith${queryString}`,
//     withCredentials: false,
//   })
//     .then((response) => {
//       problems = response.data;
//       for (let problem of problems) {
//         problem.id = nanoid();
//       }
//       updateState(problems);
//       console.log(queryString);
//     })
//     .finally(() => setLoading(false))
// }

// export const genLinear = (count, filters, setLoading, updateState) => {
//   let problems = [];
//   updateState(problems);
//   let queryString = "?";
//   if (count) queryString = `${queryString}count=${count}`
//   axios({
//     method: "get",
//     url: `${API_ENDPOINT}/gen/alg/linear${queryString}`,
//     withCredentials: false,
//   })
//     .then((response) => {
//       problems = response.data;
//       for (let problem of problems) {
//         problem.id = nanoid();
//       }
//       updateState(problems);
//     })
//     .finally(() => setLoading(false))
// }
