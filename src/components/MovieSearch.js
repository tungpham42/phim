import React, { useState } from "react";
import { Col, Form, FormControl, Button, Spinner, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";

const MovieSearch = ({ setSearchQuery, resetMovies }) => {
  const [searchQuery, setSearchQueryLocal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (query) => {
    if (query) {
      setLoading(true);
      setSearchQuery(query);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };

  const handleReset = () => {
    setSearchQueryLocal("");
    setSearchQuery("");
    resetMovies(); // Call the resetMovies function from props
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(searchQuery);
    }
  };

  return (
    <Row className="align-items-center">
      <Col md={8}>
        <Form>
          <FormControl
            type="text"
            placeholder="Điền từ khóa"
            value={searchQuery}
            onChange={(e) => setSearchQueryLocal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Form>
      </Col>
      <Col md={4}>
        <Button
          variant="primary"
          className="me-2"
          onClick={handleSearchClick}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Đang tìm
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSearch} className="me-2" />
              Tìm kiếm
            </>
          )}
        </Button>
        <Button variant="secondary" onClick={handleReset} disabled={loading}>
          <FontAwesomeIcon icon={faUndo} className="me-2" />
          Làm mới
        </Button>
      </Col>
    </Row>
  );
};

export default MovieSearch;
