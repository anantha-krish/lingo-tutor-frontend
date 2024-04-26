import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../sessionManager";
export const AuthRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};
