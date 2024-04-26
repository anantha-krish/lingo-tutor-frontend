import { Form, Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LUIFormField } from "../component";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(3, "Password must be 3 characters at minimum"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be 3 characters at minimum"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Kindly confirm your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

export const RegisterPage = () => {
  var navigate = useNavigate();

  const handleUserRegisteration = async (values) => {
    try {
      var res = await registerUser(values);
      if (res.status == 201) {
        navigate("/");
        toast.success(`User: ${res.data.username} registered successfully`);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleUserRegisteration}
          >
            {(props) => (
              <Form>
                <Row>
                  <Col>
                    <LUIFormField
                      name="firstName"
                      label="First Name"
                      {...props}
                    />
                  </Col>
                  <Col>
                    <LUIFormField
                      name="lastName"
                      label="Last Name"
                      {...props}
                    />
                  </Col>
                </Row>
                <LUIFormField name="username" label="User Name" {...props} />
                <LUIFormField
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  {...props}
                />
                <LUIFormField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your Password"
                  {...props}
                />
                <LUIFormField
                  type="password"
                  name="passwordConfirm"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  {...props}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
