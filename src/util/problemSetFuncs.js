import axios from "axios"

const API_ENDPOINT = process.env.REACT_APP_SERVER_API_ENDPOINT;

export const createProblemSet = (data, userId) => {
  // console.log(userId);
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/sets`,
    data: {
      name: data.name,
      userId: userId,
      problems: data.setProblems,
    }
  })
}

export const fetchProblemSet = (setId) => {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/sets/${setId}`
  })
}
