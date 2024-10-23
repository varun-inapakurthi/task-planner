import axios from 'axios';
console.log('import.meta.env.VITE_SERVER_URL', import.meta.env.VITE_SERVER_URL);
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
