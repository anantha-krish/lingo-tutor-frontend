import React from "react";
import http from "../api/http";
const { useState, useCallback, useMemo, useEffect } = React;

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);

  const inc = useCallback(
    () => setCounter((counter) => counter + 1),
    [setCounter]
  ); // add to counter
  const dec = useCallback(
    () => setCounter((counter) => counter - 1),
    [setCounter]
  ); // remove from counter

  const interceptors = useMemo(
    () => ({
      request: (config) => {
        inc();
        return config;
      },
      response: (response) => {
        dec();
        return response;
      },
      error: (error) => {
        dec();
        return Promise.reject(error);
      },
    }),
    [inc, dec]
  ); // create the interceptors

  useEffect(() => {
    // add request interceptors
    http.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    http.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      http.interceptors.request.eject(interceptors.request);
      http.interceptors.request.eject(interceptors.error);
      http.interceptors.response.eject(interceptors.response);
      http.interceptors.response.eject(interceptors.error);
    };
  }, [interceptors]);

  return [counter > 0];
};
