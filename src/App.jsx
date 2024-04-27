import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router";

function App() {
  return (
    <div className="vh-100 vw-100">
      <Toaster position="top-right" />
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
