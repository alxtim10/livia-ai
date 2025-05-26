import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ftmobile.inhealth.co.id/gen-ai/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false
  });

  api.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error);
    }
  );

  export default api;