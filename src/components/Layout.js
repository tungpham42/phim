import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to toggle the visibility of the Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-5 fixed-top">
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
                className={
                  location.pathname === "/phim-chieu-rap" ? "active" : ""
                }
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

      <Container className="pt-5 mt-5">
        <Outlet /> {/* Renders child routes */}
      </Container>

      <Footer />

      {showScrollTop && (
        <Button
          variant="primary"
          className="back-to-top"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            zIndex: 1000,
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      )}
    </>
  );
};

export default Layout;
