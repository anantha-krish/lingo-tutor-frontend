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
        <Row className="w-100">
          <Col lg={2}>
            <div className="p-3 bg-white">
              <Image src={BrandLogo} height={70} style={{ margin: 10 }} />
            </div>
          </Col>
          <Col lg={10}>
            <Nav className="p-2 bg-primary">
              <Row className="p-2 bg-primary">
                <Col>
                  <Nav.Link className="text-white" to="/">
                    Home
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link className="text-white" to="/quizzes/7001">
                    Quizzes (Dev only)
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link className="text-white" to="results/quizzes/7001">
                    Quizz Result (Dev only)
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link className="text-white" to="/languages/1001">
                    Langugage Detail (Dev only)
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link className="text-white" to="/dashboard">
                    User Dashboard
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link className="text-white" to="/dummy">
                    page Not found (Dev only)
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link className="text-white" to="/logout">
                    Logout (Dev only)
                  </Nav.Link>
                </Col>
                <Col>
                  <h5 className="text-white" style={{ margin: 10 }}>
                    Hi! {username}
                  </h5>
                </Col>
              </Row>
            </Nav>
            {/*<Nav className="p-2 bg-primary">
              <Link to="/">
                <Nav.Link className="text-white" style={{ margin: 10 }}>
                  Home
                </Nav.Link>
              </Link>
              <Link to="/quizzes/7001">
                <Nav.Link className="text-white" style={{ margin: 10 }}>
                  Quiz
                </Nav.Link>
              </Link>
              <Link to="results/quizzes/7001">
                <Nav.Link className="text-white" style={{ margin: 10 }}>
                  Quiz Result
                </Nav.Link>
              </Link>
              <Link to="/languages/1001">
                <Nav.Link className="text-white" style={{ margin: 10 }}>
                  Language Detail
                </Nav.Link>
              </Link>
              <Link to="/dashboard">
                <Nav.Link className="text-white" style={{ margin: 10 }}>
                  Dashboard
                </Nav.Link>
              </Link>
              <Link to="/dummy">
                <Nav.Link className="text-white" style={{ margin: 10 }}>
                  Page Not found
                </Nav.Link>
              </Link>
              <Link to="/logout">
                <Nav.Link
                  className="text-white"
               
                  style={{ margin: 10 }}
                >
                  Logout
                </Nav.Link>
              </Link>
              <h5 className="text-white" style={{ margin: 10 }}>
                Hi! {username}
              </h5>
  </Nav>*/}
          </Col>
        </Row>
      </Navbar>
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
  ) : (
    <Navigate to="/login" />
  );
};
