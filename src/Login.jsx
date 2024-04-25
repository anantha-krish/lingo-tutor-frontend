import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import logo from "./images/logo.jpeg";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character"
    ),
});

export const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate({
        username: username,
        password: password,
      });
      // Your login logic here
      console.log("Login successful");
    } catch (error) {
      // Handle validation errors
      console.error("Validation Error:", error.message);
    }
  };

  const handleRegister = () => {
    navigate("/register");
    console.log("Redirecting to registration page");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col col-xs-12 col-sm-8 col-md-6">
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Logo"
              style={{ maxWidth: "100%", maxHeight: "150px" }}
            />
          </div>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={() => {}}
          >
            {(props) => (
              <>
                {" "}
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={
                    props.touched.firstName && props.errors.firstName
                      ? "is-invalid"
                      : ""
                  }
                  //isValid={LoginSchema}
                  onChange={handleUsernameChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  //isValid={LoginSchema}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
