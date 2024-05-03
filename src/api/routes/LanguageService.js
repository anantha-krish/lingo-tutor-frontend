import http from "../http";

export function getLanguages() {
  return http.get(`/languages`);
}

export function getLanguageById(id) {
  return http.get(`/languages/${id}`);
}

export function getArticleById(id) {
  return http.get(`/languages/articles/${id}`);
}
export function getArticleInfoById(id) {
  return http.get(`/languages/articles/${id}/info`);
}
