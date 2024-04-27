import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { getUserProfile, updateUserProfile } from "../../api";
import { LUIFormField } from "../../components";

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
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isReadMode, setIsReadMode] = useState(true);

  const setUserDetails = ({ firstName, lastName, email }) =>
    setUser({ firstName, lastName, email });

  const initUserProfile = async () => {
    try {
      var res = await getUserProfile();
      if (res.status == 200) {
        setUserDetails(res.data);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  useEffect(() => {
    initUserProfile();
  }, [isReadMode]);

  const EditCTAButtons = ({ isSubmitting }) => {
    return isReadMode ? (
      <>
        <Col />
        <Col>
          <Button
            className="w-100"
            type="button"
            onClick={() => setIsReadMode(false)}
          >
            Edit
          </Button>
        </Col>
      </>
    ) : (
      <>
        <Col>
          <Button
            className=" w-100"
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={() => setIsReadMode(true)}
          >
            Cancel
          </Button>
        </Col>
        <Col>
          <Button className=" w-100" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </Col>
      </>
    );
  };

  const handleUserProfileEdits = async (values) => {
    try {
      var res = await updateUserProfile(values);
      if (res.status == 200) {
        toast.success(
          `User: ${res.data.userName} profile updated successfully`
        );
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <Row className="h-100">
      <Col className="align-items-center">
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }}
          validationSchema={profileSchema}
          onSubmit={handleUserProfileEdits}
          enableReinitialize
        >
          {(props) => (
            <Form>
              <Row>
                <Col>
                  <div className="user_profile_icon bg-warning-subtle border d-flex align-items-center text-body justify-content-center p-4">
                    {props.values.firstName &&
                      props.values.firstName.split("")[0] +
                        props.values.lastName.split("")[0]}
                  </div>
                </Col>
              </Row>

              <Row>
                <LUIFormField
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                  readOnly={isReadMode}
                  enableValidFeedback={false}
                  {...props}
                />
              </Row>
              <Row>
                <LUIFormField
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                  readOnly={isReadMode}
                  enableValidFeedback={false}
                  {...props}
                />
              </Row>
              <Row>
                <Col>
                  <LUIFormField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    readOnly={isReadMode}
                    enableValidFeedback={false}
                    {...props}
                  />
                </Col>
              </Row>
              <Container fluid>
                <Row className="mt-4 mb-4">
                  <EditCTAButtons {...props} />
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};
