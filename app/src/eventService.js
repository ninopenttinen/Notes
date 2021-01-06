import axios from "axios";
const url = "http://localhost:5000/events";

const getAll = () => {
  return axios.get(url);
};

const getByDate = (date) => {
  return axios.get(`${url}?date=${date}`);
};

const create = (newObject) => {
  return axios.post(url, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${url}/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${url}/${id}`);
};

const eventService = { getAll, getByDate, create, update, remove };
export default eventService;
