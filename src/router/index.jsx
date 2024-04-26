import Languages from "../Languages";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LanguageDetail from "../LanguageDetail";
import { LoginUser } from "../Login";
import { RegisterPage, PageNotFound } from "../pages";
import { AuthRoute } from "./AuthRoute";

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
    ],
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
