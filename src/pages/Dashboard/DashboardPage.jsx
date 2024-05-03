import { Col, Container, Row } from "react-bootstrap";
import { EditProfileComponent } from "./EditProfile";
import { LanguageLevel } from "./LanguageLevel";
import { RecentlyVisited } from "./RecentlyVisited";

export const DashboardPage = () => (
  <Container fluid>
    <Row>
      <Col lg={3} md sm className="align-items-center">
        <EditProfileComponent />
      </Col>

      <Col lg md sm className="mt-2">
        <RecentlyVisited />
      </Col>
      <Col lg={5} md sm className="mt-2">
        <LanguageLevel />
      </Col>
    </Row>
  </Container>
);
