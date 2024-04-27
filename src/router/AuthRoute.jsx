import { Link, Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../sessionManager";
import { Col, Row } from "react-bootstrap";
import { useAxiosLoader } from "../components/useAxiosLoader";
import { BarLoader } from "react-spinners";
import { auto } from "@popperjs/core";
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
      </Row>
      <Row style={{ minHeight: 10 }}>
        {loading ? <BarLoader color="#36d7b7" width={auto} height={10} /> : " "}
      </Row>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
