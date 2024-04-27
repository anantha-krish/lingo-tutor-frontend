import Languages from "../Languages";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginUser } from "../Login";
import {
  RegisterPage,
  PageNotFound,
  LanguageDetail,
  DashboardPage,
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
