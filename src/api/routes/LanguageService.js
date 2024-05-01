import http from "../http";
import toast from "react-hot-toast";

export async function getLanguages() {
  var response = await http(`/languages`);
  if (response.status == 200) {
    toast.success("Successfully fetched langugages ");
  }
  return response;
}

export function getLanguageById(id) {
  return http.get(`/languages/${id}`);
}

export function getArticleById(id) {
  return http.get(`/languages/articles/${id}`);
}
