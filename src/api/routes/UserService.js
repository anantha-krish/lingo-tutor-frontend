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
