import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getUserProfile, updateUserProfile } from "../../api";
import { LUIFormField } from "../../components";
import LandscapeLogo from "@assets/images/logo_landscape_transparent.png";

const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(3, "Should have minimum 3 characters"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
});

export const EditProfileComponent = () => {
  var navigate = useNavigate();
  const [user, setUser] = useState({});

  const setUserDetails = ({ firstName, lastName, email }) =>
    setUser({ firstName, lastName, email });

  useEffect(() => {
    initUserProfile();
  }, []);

  const initUserProfile = async () => {
    try {
      var res = await getUserProfile();
      if (res.status == 200) {
        setUserDetails(res.data);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const handleUserProfileEdits = async (values) => {
    try {
      var res = await updateUserProfile(values);
      if (res.status == 200) {
        toast.success(
          `User: ${res.data.username} profile updated successfully`
        );
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <Container fluid className="bg-body-tertiary">
      <Row className="h-100">
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
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }}
            enableReinitialize
            validationSchema={profileSchema}
            onSubmit={handleUserProfileEdits}
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

                  <Col>
                    <LUIFormField
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
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
              </Form>
            )}
          </Formik>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};
