import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FontAwesomeIcon icon={faVideo} className="me-2" />
            Kho phim
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Trang chủ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/phim-chieu-rap"
                className={location.pathname === "/phim-chieu-rap" ? "active" : ""}
              >
                Phim chiếu rạp
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/phim-bo"
                className={location.pathname === "/phim-bo" ? "active" : ""}
              >
                Phim bộ
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Outlet /> {/* Renders child routes */}
      </Container>

      <Footer />
    </>
  );
};

export default Layout;
