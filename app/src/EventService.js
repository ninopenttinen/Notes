import axios from "axios";
const url = "http://localhost:5000/events";

const getAll = () => {
    // console.log("Attempting get request...");
    return axios.get(url);
};

const getByDate = (date) => {
    return axios.get(`${url}?date=${date}`);
};

const create = (newObject) => {
    // console.log("Attempting post request...");
    return axios.post(url, newObject);
};

const update = (id, newObject) => {
    // console.log("Attempting update request...");
    return axios.put(`${url}/${id}`, newObject);
};

const remove = (id) => {
    // console.log("Attempting delete request...");
    return axios.delete(`${url}/${id}`);
};

export default { getAll, getByDate, create, update, remove };