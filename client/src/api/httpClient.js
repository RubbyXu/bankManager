import axios from "axios";

const httpClient = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_HOST,
  baseURL: 'http://localhost:8080', // --- need improve later
  timeout: 480000,
  withCredentials: true  // Enable cookie
});

export default httpClient;