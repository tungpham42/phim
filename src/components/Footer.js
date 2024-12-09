import { Col, Row } from "react-bootstrap";

const Footer = () => (
  <footer className="my-5">
    <Row className="justify-content-center text-center">
      <Col md="auto">
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/tmdb.svg" alt="TMDb Logo" style={{ width: "240px" }} />
        </a>
      </Col>
    </Row>
  </footer>
);
export default Footer;
