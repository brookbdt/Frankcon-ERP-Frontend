import axios from "axios";
const url = "http://localhost:1337/api/faq";
export const readForum = () => axios.get(url);
export const createQuestion = (newQuestion) => axios.post(url, newQuestion);
