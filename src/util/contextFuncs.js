import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_SERVER_API_ENDPOINT;

axios.defaults.withCredentials=true;

export const fetchUser = () => {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/users/current`
  })  
}
