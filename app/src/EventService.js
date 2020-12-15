import axios from "axios";
const url = "http://localhost:5000/events";

const getAll = () => {
  console.log("Attempting get request...");
  return axios.get(url);
};

const create = (newObject) => {
  console.log("Attempting post request...");
  return axios.post(url, newObject);
};

const update = (date, newObject) => {
  console.log("Attempting update request...");
  return axios.put(`${url}/${date}`, newObject);
};

export default { getAll, create, update };
