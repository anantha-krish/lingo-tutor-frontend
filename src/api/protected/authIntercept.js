import { getToken } from "../../sessionManager";
import http from "../http";

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
