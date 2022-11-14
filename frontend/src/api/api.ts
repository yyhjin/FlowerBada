import axios from 'axios';

const DEV = 'http://localhost:8080/api/v1';
const HOST = 'https://k7a405.p.ssafy.io:8080/api/v1/';

const api = axios.create({
  baseURL: DEV,
});

export default api;
