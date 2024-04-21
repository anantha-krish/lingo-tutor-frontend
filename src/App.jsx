import { useEffect, useState } from "react";
import Languages from "./Languages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LanguageDetail from "./LanguageDetail";
import { RegisterUser } from "./Register";
import { getLanguages } from "./api/AuthService";

const router = createBrowserRouter([
  {
    path: "/",
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
    getLanguages();
  }, []);
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
