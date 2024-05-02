import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUsername } from "../sessionManager";
import { Container, Navbar, Nav, Image, Row, Col } from "react-bootstrap";
import { useAxiosLoader } from "../api";
import { BarLoader } from "react-spinners";
import BrandLogo from "../assets/images/logo_portrait.png";
export const AuthRoute = () => {
  const [loading] = useAxiosLoader();
  var username = getUsername();
  return isAuthenticated() ? (
    <Container fluid>
      <Navbar>
        <Row>
          <Col>
            <div className="p-3 bg-white">
              <Image src={BrandLogo} height={70} style={{ margin: 10 }} />
            </div>
          </Col>
          <Col>
            <Nav className="p-2 bg-primary">
              <Nav.Link className="text-white" href="/" style={{ margin: 10 }}>
                Home
              </Nav.Link>
              <Nav.Link
                className="text-white"
                href="/quizzes/7001"
                style={{ margin: 10 }}
              >
                Quiz
              </Nav.Link>
              <Nav.Link
                className="text-white"
                href="results/quizzes/7001"
                style={{ margin: 10 }}
              >
                Quiz Result
              </Nav.Link>
              <Nav.Link
                className="text-white"
                href="/languages/1001"
                style={{ margin: 10 }}
              >
                Language Detail
              </Nav.Link>
              <Nav.Link
                className="text-white"
                href="/dashboard"
                style={{ margin: 10 }}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                className="text-white"
                href="/dummy"
                style={{ margin: 10 }}
              >
                Page Not found
              </Nav.Link>
              <Nav.Link
                className="text-white"
                href="/logout"
                style={{ margin: 10 }}
              >
                Logout
              </Nav.Link>
              <h5 className="text-white" style={{ margin: 10 }}>
                Hi! {username}
              </h5>
            </Nav>
          </Col>
        </Row>
        <Row style={{ minHeight: 10 }}>
          {loading ? (
            <BarLoader color="#36d7b7" style={{ width: "100%" }} height={10} />
          ) : (
            " "
          )}
        </Row>
      </Navbar>

      <Row>
        <Outlet />
      </Row>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
};
