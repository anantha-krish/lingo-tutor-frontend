import { Col, Container, Row } from "react-bootstrap";
import { EditProfileComponent } from "./EditProfile";

export const DashboardPage = () => (
  <Container>
    <Row>
      <Col>
        <EditProfileComponent />
      </Col>
      <Col>Charts</Col>
    </Row>
  </Container>
);
