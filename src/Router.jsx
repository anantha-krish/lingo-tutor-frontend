import Languages from "./Languages";
import { createBrowserRouter } from "react-router-dom";
import LanguageDetail from "./LanguageDetail";
import { LoginUser } from "./Login";
import { RegisterPage, PageNotFound } from "./pages";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginUser />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
    path: "*",
    element: <PageNotFound />,
  },
]);
