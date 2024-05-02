import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import LingoBrand from "../assets/images/logo_transparent.png";
import { getUsername } from "../sessionManager";

// Dev only (Delete later)
const devMenu = [
  { text: " Quiz (Dev)", link: "languages/2001/quizzes/7002" },
  { text: " Quiz  Result (Dev)", link: "/results/quizzes/7001" },
  { text: "Lang Detail (Dev)", link: "/languages/1001" },
  { text: "Page Not Found (Dev)", link: "/dummy" },
];
const menuItems = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Dashboard",
    link: "/dashboard",
  },
  ...devMenu,
];

export const LUINavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src={LingoBrand}
            style={{ background: "white", borderRadius: "50%" }}
            width="auto"
            height="30"
            className="d-inline-block align-top"
          />
          <span style={{ marginLeft: 5 }}>Lingo Tutor</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="me-auto">
            {menuItems.map((val, index) => (
              <Link to={val.link} key={`menu_${index}`} className="nav-link">
                {val.text}
              </Link>
            ))}
          </Nav>

          <Navbar.Text>
            Signed in as:
            <span>
              <Link
                to={"/logout"}
                className="d-inline-block nav-link"
                style={{ minWidth: 20, marginLeft: 5 }}
              >
                @{getUsername()}
              </Link>
            </span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
