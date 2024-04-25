import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "./api";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
});
/*
const LingoFormField = ({ label, labelClass, ...props }) => {
  const controlId = useId();
  return (
    <FloatingLabel controlId={controlId} label={label} className={labelClass}>
      <Form.Control {...props} />
    </FloatingLabel>
  );
};*/

export const RegisterUser = () => {
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
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              registerUser(values);
            }}
          >
            {(props) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Enter firstname"
                    autoComplete="off"
                    className={`mt-2 form-control ${
                      props.touched.firstName && props.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="firstName"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Enter lastname"
                    autoComplete="off"
                    className={`mt-2 form-control ${
                      props.touched.lastName && props.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="lastName"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    autoComplete="off"
                    className={`mt-2 form-control ${
                      props.touched.username && props.errors.username
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="username"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    autoComplete="off"
                    className={`mt-2 form-control ${
                      props.touched.email && props.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="mt-3">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className={`form-control ${
                      props.touched.password && props.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="invalid-feedback"
                  />
                </div>
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
