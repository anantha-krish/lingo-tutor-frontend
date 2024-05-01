import { Col, Row } from "react-bootstrap";
import { EditProfileComponent } from "./EditProfile";
import { LanguageLevel } from "./LanguageLevel";

export const DashboardPage = () => (
  <Row>
    <Col />
    <Col lg={3} className="align-items-center">
      <EditProfileComponent />
    </Col>
    <Col>
      <LanguageLevel />
    </Col>
    <Col lg={3}></Col>
    <Col />
  </Row>
);
