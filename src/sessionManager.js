export const getToken = () => sessionStorage.getItem("token") ?? "";
export const getUsername = () => sessionStorage.getItem("username") ?? "";
//export const isAuthenticated = () => getToken().length > 0;
export const isAuthenticated = () => true; // ONLY dev purpose remove it later
export const setToken = (token) => sessionStorage.setItem("token", token);
export const setUsername = (username) =>
  sessionStorage.setItem("username", username);
