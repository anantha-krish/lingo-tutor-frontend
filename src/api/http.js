import axios from "axios";
import toast from "react-hot-toast";
import { getToken } from "../sessionManager";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    var addAuthHeader = getToken().length > 0;
    return {
      ...config,
      headers: {
        ...config.headers,
        ...(addAuthHeader && { Authorization: `Bearer ${getToken()}` }),
      },
    };
  },
  function (error) {
    // Do something with request error
    toast.error(error.request.status + ":" + error.request.data.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    toast.error(error.response.status + ":" + error.response.data.message);
    if (error.response.status == 401) {
      sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default http;
