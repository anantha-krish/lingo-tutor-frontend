export const getToken = () => sessionStorage.getItem("token") ?? "";
export const isAuthenticated = () => getToken().length > 0;
export const setToken = (token) => sessionStorage.setItem("token", token);
