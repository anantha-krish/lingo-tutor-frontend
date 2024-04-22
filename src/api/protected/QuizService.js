import http from "../http";
import "./authIntercept";

export async function getQuizzes() {
  var response = await http(`${http.defaults.baseURL}/quizzes`);

  if (response.status == 200) {
    toast.success("Successfully fetched quizzes ");
  }
}
