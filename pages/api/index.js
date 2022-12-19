import axios from "axios";
// const url = "http://localhost:1337/api";
const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api`;
export const readTask = () => axios.get(`${url}/tasks`);
export const readEmployee = () => axios.get(`${url}/employees`);
export const readOrder = () => axios.get(`${url}/orders`);
export const readInventory = () => axios.get(`${url}/inventories`);
export const createQuestion = (newQuestion) =>
  axios.post(`${url}/faqs`, newQuestion);
export const readPurchaseRequest = () => axios.get(`${url}/purchaserequests`);
export const createTask = (newTask) => axios.post(`${url}/tasks`, newTask);
export const createEmployee = (newEmployee) =>
  axios.post(`${url}/employees`, newEmployee);
export const createNewProject = (newProject) =>
  axios.post(`${url}/projects`, newProject);
export const readProject = () => axios.get(`${url}/projects`);
export const createLeaveRequest = (newLeaveRequest) =>
  axios.post(`${url}/leave-requests`, newLeaveRequest);
export const createPurchaseRequest = (newPurchaseRequest) =>
  axios.post(`${url}/purchaserequests`, newPurchaseRequest);
// export const readForum = () => axios.get(url);
