import axios from "axios";
// const url = "http://localhost:1337/api";
const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api`;
export const readTask = () => axios.get(`${url}/tasks`);
export const createQuestion = (newQuestion) =>
	axios.post(`${url}/faqs`, newQuestion);
export const createTask = (newTask) => axios.post(`${url}/tasks`, newTask);
// export const readForum = () => axios.get(url);
