import { useEffect } from "react";
import Languages from "./Languages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LanguageDetail from "./LanguageDetail";
import { LoginUser } from "./Login";
import { RegisterUser } from "./Register";
import { getLanguages, getQuizzes } from "./api";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginUser />,
  },
  {
    path: "/register",
    element: <RegisterUser />,
  },
  {
    path: "/languages",
    element: <Languages />,
  },
  {
    path: "/languages/:id",
    element: <LanguageDetail />,
  },
]);

function App() {
  useEffect(() => {
    /*  setToken(
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXZpIiwiaWF0IjoxNzEzNzU1NzMwLCJleHAiOjE3MTM3NTc1MzB9.2Dbfh8CSIM8hGOx08P5TaY26samoeTErAT5Lm26K5AQ"
    );*/
    getLanguages();
    getQuizzes();
  }, []);
  //const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
