import http from "../http";

export function registerUser(formObject) {
  var { firstName, lastName, username, email, password } = formObject;
  // assuming only users can register from frontend

  var roles = "ROLE_USER";
  return http.post(`/auth/register`, {
    firstName,
    lastName,
    username,
    email,
    password,
    roles,
  });
}

export function loginUser(formObject) {
  var { username, password } = formObject;
  // assuming only users can login from frontend

  return http.post(`/auth/token`, {
    username,
    password,
  });
}
