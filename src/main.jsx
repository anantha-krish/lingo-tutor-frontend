import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Import our custom CSS
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> (disabled strict mode to avoid duplicate api request)
  <App />
  // </React.StrictMode>
);
