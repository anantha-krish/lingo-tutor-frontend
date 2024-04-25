import toast from "react-hot-toast";
import http from "../http";

export async function registerUser(formObject) {
  var { firstName, lastName, username, email, password } = formObject;
  // assuming only users can register from frontend

  var roles = "ROLE_USER";
  var response = await http.post(`/auth/register`, {
    firstName,
    lastName,
    username,
    email,
    password,
    roles,
  });

  if (response.status == 200) {
    toast.success("Successfully registered ");
    //TODO redirect to login
  } else {
    toast.error(`Unable to register :${response.data.error}`);
  }
}

export async function loginUser(formObject) {
  var { username, password } = formObject;
  // assuming only users can login from frontend

  var roles = "ROLE_USER";
  var response = await http.post(`/auth/token`, {
    username,
    password,
    roles,
  });

  if (response.status == 200) {
    toast.success("Successfully registered ");
    //TODO redirect to main page
  } else {
    toast.error(`Unable to register :${response.data.error}`);
  }
}
