import { Col, Container, Row } from "react-bootstrap";
import { EditProfileComponent } from "./EditProfile";
import { LanguageLevel } from "./LanguageLevel";

export const DashboardPage = () => (
  <Container fluid>
    <Row>
      <Col lg={3} className="align-items-center">
        <EditProfileComponent />
      </Col>

      <Col lg={8}>
        <LanguageLevel />
      </Col>
      <Col />
    </Row>
  </Container>
);
