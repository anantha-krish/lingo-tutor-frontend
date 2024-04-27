import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
