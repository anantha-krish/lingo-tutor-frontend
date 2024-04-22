import http from "../http";
import "./authIntercept";

export async function getLanguages() {
  var response = await http(`${http.defaults.baseURL}/languages`);
  if (response.status == 200) {
    toast.success("Successfully fetched langugages ");
  }
}
