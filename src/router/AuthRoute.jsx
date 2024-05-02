import { Col, Container, Row } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useAxiosLoader } from "../api";
import { LUINavbar } from "../components";
import { isAuthenticated } from "../sessionManager";
export const AuthRoute = () => {
  const [loading] = useAxiosLoader();
  return isAuthenticated() ? (
    <>
      <LUINavbar />
      <Container fluid>
        <Row style={{ minHeight: 10 }}>
          <Col lg={12}>
            {loading ? (
              <BarLoader color="#36d7b7" className="w-100" height={10} />
            ) : (
              " "
            )}
          </Col>
        </Row>
        <Row>
          <Outlet />
        </Row>
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
