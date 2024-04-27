import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Router } from "./router";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="vh-100 vw-100">
        <RouterProvider router={Router} />
        <Toaster position="top-right" />
      </div>
    </Suspense>
  );
}
const Loading = () => (
  <div className="spinner-grow text-primary" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

export default App;
