import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_SERVER_API_ENDPOINT;

export const login = (data) => {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/auth/login`,
    data: data
  })
    // .then((response) => {
    //   console.log("Logged in!");
    //   console.log(response);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
}

export const logout = () => {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/auth/logout`,
  })
    // .then((response) => console.log(response))
}

export const signup = (data) => {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/users/new`,
    data: data,
  })
}
