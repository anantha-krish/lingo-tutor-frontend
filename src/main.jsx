import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Import our custom CSS
import "./index.scss";
// Import all of Bootstrap's JS
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <App />
  // </React.StrictMode>
);
