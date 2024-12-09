import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const Layout = () => {
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
              <Nav.Link as={Link} to="/">
                Trang chủ
              </Nav.Link>
              <Nav.Link as={Link} to="/phim-rap">
                Phim chiếu rạp
              </Nav.Link>
              <Nav.Link as={Link} to="/phim-bo">
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
