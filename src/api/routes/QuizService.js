import http from "../http";

export function getMcqsByQuizId(quizId) {
  return http.get(`/quizzes/${quizId}`);
}

export function getMcqById(mcqId) {
  return http.get(`/quizzes/mcqs/${mcqId}`);
}
