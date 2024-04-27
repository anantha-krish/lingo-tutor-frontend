import { Form, Formik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../api";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LUIFormField } from "../components";
import LandscapeLogo from "../assets/images/logo_portrait_transparent.png";
import { setToken, setUsername } from "../sessionManager";
import { auto } from "@popperjs/core";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be 3 characters at minimum"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character"
    ),*/
});

export const LoginPage = () => {
  var navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      var res = await loginUser(values);
      if (res.status == 200) {
        toast.success(`User: ${res.data.username} logged in successfully`);
        setToken(res.data);
        setUsername(values.username);
        navigate("/");
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <Container fluid>
      <Row className="vh-100 bg-body-tertiary">
        <Col />
        <Col lg={4} md={8} xs={10}>
          <Row className="h-100 justify-content-center p-4">
            <Col>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {(props) => (
                  <Form onSubmit={props.handleSubmit}>
                    <Row>
                      <Image
                        src={LandscapeLogo}
                        className="mb-4"
                        height={auto}
                        style={{ maxHeight: 400 }}
                      />
                    </Row>

                    <Row>
                      <Col>
                        <LUIFormField
                          name="username"
                          label="User Name"
                          enableValidFeedback={false}
                          placeholder="Enter your user name"
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
                          enableValidFeedback={false}
                          placeholder="Enter your password"
                          {...props}
                        />
                      </Col>
                    </Row>
                    <Container fluid>
                      <Row className="mt-4 mb-4">
                        <Col>
                          <Button
                            className=" w-100"
                            type="button"
                            variant="secondary"
                            onClick={() => navigate("/register")}
                            disabled={props.isSubmitting}
                          >
                            Register
                          </Button>
                        </Col>

                        <Col>
                          <Button
                            className=" w-100"
                            type="submit"
                            disabled={props.isSubmitting}
                          >
                            {props.isSubmitting ? "Logging in..." : "Login"}
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};
