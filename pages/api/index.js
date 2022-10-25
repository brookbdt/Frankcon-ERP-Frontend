import axios from "axios";
const url = "http://localhost:1337/api";
// const url = "http://localhost:1337/api/faqs";
export const readTask = () => axios.get(`${url}/tasks`);
export const createQuestion = (newQuestion) =>
	axios.post(`${url}/faqs`, newQuestion);
export const createTask = (newTask) => axios.post(`${url}/tasks`, newTask);
// export const readForum = () => axios.get(url);
