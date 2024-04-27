import Languages from "../Languages";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  RegisterPage,
  PageNotFound,
  LanguageDetail,
  DashboardPage,
  LoginPage,
  LogoutPage,
} from "../pages";
import { AuthRoute } from "./AuthRoute";
//import { EditProfileComponent } from "../pages/EditProfile";

export const Router = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: [
      // add the pages to be accessed only by authorized users
      {
        path: "/",
        // considering languages will be homepage
        element: <Navigate to="/languages" />,
      },
      {
        path: "/languages",
        element: <Languages />,
      },
      {
        path: "/languages/:id",
        element: <LanguageDetail />,
      },
      {
        path: "/dashboard",
        // considering languages will be homepage
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
