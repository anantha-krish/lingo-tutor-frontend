import Languages from "../Languages";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  RegisterPage,
  PageNotFound,
  LanguageDetail,
  DashboardPage,
  LoginPage,
  LogoutPage,
  QuizPage,
  MultiChoiceQnComponent,
} from "../pages";
import { AuthRoute } from "./AuthRoute";
import { ArticleDetailComponent } from "../pages/LanguageDetail/ArticleDetailComponent";
//import { EditProfileComponent } from "../pages/EditProfile";

export const Router = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: [
      // add the pages to be accessed only by authorized users
      {
        path: "/",
        // considering languages will be homepage
        element: <Navigate to="/languages/" />,
      },
      {
        path: "/languages/",
        element: <Languages />,
      },
      {
        path: "/languages/:languageId/",
        element: <LanguageDetail />,
        children: [
          { path: "articles/:articleId", element: <ArticleDetailComponent /> },
        ],
      },
      {
        path: "/quizzes/:quizId/",
        element: <QuizPage />,
        children: [
          { path: "mcqs/:mcqId", element: <MultiChoiceQnComponent /> },
        ],
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
