import { Form, Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LUIFormField } from "../components";
import LandscapeLogo from "../assets/images/logo_landscape_transparent.png";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(3, "Should have minimum 3 characters"),
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
        toast.success(`User: ${res.data.userName} registered successfully`);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <Container fluid className="bg-body-tertiary">
      <Row>
        <Col className="mt-4">
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </Col>
        <Col lg={6} md={10} xs={12} className="align-items-center">
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
              <Form onSubmit={props.handleSubmit}>
                <Row>
                  <Row>
                    <Col>
                      <Image src={LandscapeLogo} height={150} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <LUIFormField
                        name="firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                        {...props}
                      />
                    </Col>
                    <Col>
                      <LUIFormField
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter your last name"
                        {...props}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <LUIFormField
                        name="username"
                        label="User Name"
                        placeholder="Please provide a unique username"
                        {...props}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <LUIFormField
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        {...props}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <LUIFormField
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter your Password"
                        {...props}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <LUIFormField
                        type="password"
                        name="passwordConfirm"
                        label="Confirm Password"
                        placeholder="Please retype your Password"
                        {...props}
                      />
                    </Col>
                  </Row>

                  <Container fluid>
                    <Row className="mt-4 mb-4">
                      <Col>
                        <Button
                          className=" w-100"
                          type="reset"
                          variant="secondary"
                          disabled={props.isSubmitting}
                        >
                          Cancel
                        </Button>
                      </Col>

                      <Col>
                        <Button
                          className=" w-100"
                          type="submit"
                          disabled={props.isSubmitting}
                        >
                          {props.isSubmitting ? "Registering..." : "Register"}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};
