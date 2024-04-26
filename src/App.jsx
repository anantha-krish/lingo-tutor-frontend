import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Router } from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
