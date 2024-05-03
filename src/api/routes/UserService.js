import http from "../http";

export function updateUserProfile(formObject) {
  var { firstName, lastName, email } = formObject;

  return http.put("/user/profile", {
    firstName,
    lastName,
    email,
  });
}

export function getUserProfile() {
  return http.get("/user/profile");
}

export function getUserScoreByQuizId(quizId) {
  return http.get(`/user/scores/quizzes/${quizId}`);
}

export function getUserVisitHistory(pageNum, pageSize) {
  return http.get(`/user/visits/articles?page=${pageNum}&limit=${pageSize}`);
}

export function saveUserVisitHistory(articleId) {
  return http.post(`/user/visits/articles/${articleId}`);
}
