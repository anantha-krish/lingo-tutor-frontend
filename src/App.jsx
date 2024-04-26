import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Router } from "./router";

function App() {
  return (
    <div className="vh-100 vw-100">
      <RouterProvider router={Router} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
