import { Link, Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../sessionManager";
import { Col, Row } from "react-bootstrap";
import { useAxiosLoader } from "../api";
import { BarLoader } from "react-spinners";
export const AuthRoute = () => {
  const [loading] = useAxiosLoader();
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
        <Col>
          <Link className="text-white" to="/logout">
            Logout (Dev only)
          </Link>
        </Col>
      </Row>
      <Row style={{ minHeight: 10 }}>
        {loading ? (
          <BarLoader color="#36d7b7" style={{ width: "100%" }} height={10} />
        ) : (
          " "
        )}
      </Row>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
