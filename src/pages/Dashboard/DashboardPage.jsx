import { Col, Row } from "react-bootstrap";
import { EditProfileComponent } from "./EditProfile";

export const DashboardPage = () => (
  <Row>
    <Col />
    <Col lg={3} className="align-items-center">
      <EditProfileComponent />
    </Col>
    <Col lg={7}>Charts</Col>
    <Col />
  </Row>
);
