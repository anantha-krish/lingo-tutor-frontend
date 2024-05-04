import { Placeholder } from "react-bootstrap";
import { useAxiosLoader } from "../api";

export const LazyCell = ({ children }) => {
  const [loading] = useAxiosLoader();
  return loading ? <Placeholder xs={12} bg="secondary" /> : children;
};
