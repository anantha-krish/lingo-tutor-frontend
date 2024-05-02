import { Col, Row } from "react-bootstrap";
import { EditProfileComponent } from "./EditProfile";
import { LanguageLevel } from "./LanguageLevel";

export const DashboardPage = () => (
  <Row>
    <Col />
    <Col className="align-items-center">
      <EditProfileComponent />
    </Col>
    <Col lg={1} />
    <Col lg={6}>
      <LanguageLevel />
    </Col>
    <Col />
  </Row>
);
