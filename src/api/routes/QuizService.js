import http from "../http";
import toast from "react-hot-toast";

export async function getQuizzes() {
  var response = await http(`/quizzes`);

  if (response.status == 200) {
    toast.success("Successfully fetched quizzes ");
  }
}
