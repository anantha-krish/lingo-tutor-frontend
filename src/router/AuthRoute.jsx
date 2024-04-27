import { Link, Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../sessionManager";
import { Col, Row } from "react-bootstrap";
export const AuthRoute = () => {
  return isAuthenticated() ? (
    <>
      <Row className="mt-2 p-2 bg-primary">
        <Col>
          <Link className="text-white" to="/">
            Home
          </Link>
        </Col>
        <Col>
          <Link className="text-white" to="/quizzes/1001">
            Quizzes (Dev only)
          </Link>
        </Col>
        <Col>
          <Link className="text-white" to="/languages/1001">
            Langugage Detail (Dev only)
          </Link>
        </Col>
        <Col>
          <Link className="text-white" to="/dashboard">
            User Dashboard
          </Link>
        </Col>
        <Col>
          <Link className="text-white" to="/dummy">
            page Not found (Dev only)
          </Link>
        </Col>
      </Row>

      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
