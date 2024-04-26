import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Router } from "./Router";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="vh-100 vw-100">
      <RouterProvider router={Router} />
      <Toaster position="top-right" />
    </Container>
  );
}

export default App;
