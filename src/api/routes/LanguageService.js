import http from "../http";
import toast from "react-hot-toast";

export async function getLanguages() {
  var response = await http(`/languages`);
  if (response.status == 200) {
    toast.success("Successfully fetched langugages ");
  }
}
