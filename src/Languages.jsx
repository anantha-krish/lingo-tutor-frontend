import { useEffect } from "react";
import { getLanguages } from "./api";

const Languages = () => {
  useEffect(() => {
    getLanguages();
  }, []);
  return <>This is Language Listing</>;
};

export default Languages;
