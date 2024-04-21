import toast from "react-hot-toast";
import http from "./axios";
import axios from "axios";

export async function registerUser(formObject) {
  var { firstName, lastName, username, email, password } = formObject;
  var roles = "ROLE_USER";
  var response = await http.post(`/auth/register`, {
    firstName: "test",
    lastName: "wilson",
    username: "ptzest",
    email: "patsest@gmail.com",
    password: "pavi@123",
    roles: "ROLE_USER",

    /*firstName,
    lastName,
    username,
    email,
    password,
    roles,*/
  });

  if (response.status == 200) {
    toast.success("Successfully registered ");
    //TODO redirect to login
  } else {
    toast.error(`Unable to register :${response.data.error}`);
  }
}

export async function getLanguages() {
  var response = await http(`${http.defaults.baseURL}/languages`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmFudGhhayIsImlhdCI6MTcxMzcxNTYyNSwiZXhwIjoxNzEzNzE3NDI1fQ.eAqTSPGun-2C9NvXAqILK7zOLU5AvGdcb9sZz7bsqDg",
    },
  });
}
