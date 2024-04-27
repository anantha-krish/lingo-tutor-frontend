import { Col, Container, Row } from "react-bootstrap";
import { EditProfileComponent } from "./EditProfile";

export const DashboardPage = () => (
  <Container className="h-100 w-100">
    <Row className="h-100">
      <Col lg={4}>
        <EditProfileComponent />
      </Col>
      <Col lg={8}>Charts</Col>
    </Row>
  </Container>
);
