import React, { useState } from "react";
import { Col, Card, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css";

const MovieCard = ({ movie, genres }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const moviePoster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://dummyimage.com/260x200/cccccc/555555.png&text=${encodeURIComponent(
        movie.title.trim()
      ).replace(/%20/g, "+")}`;

  return (
    <>
      {/* Movie Card */}
      <Col key={movie.id} lg={3} md={4} sm={6} className="mb-4">
        <Card className="h-100 movie-card rounded shadow-lg">
          <Card.Img
            variant="top"
            src={`${moviePoster}`}
            alt={movie.title}
            className="rounded-top"
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              <strong>Năm ra mắt:</strong>{" "}
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </Card.Text>
            <Button variant="primary" size="sm" onClick={handleShow}>
              <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
              Chi tiết
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Modal for Movie Details */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`${moviePoster}`}
            alt={movie.title}
            className="img-fluid rounded mb-3"
          />
          <p>
            <strong>Tóm tắt:</strong>{" "}
            {movie.overview || "No description available."}
          </p>
          <p>
            <strong>Ngày ra mắt:</strong> {movie.release_date || "N/A"}
          </p>
          <p>
            <strong>Đánh giá:</strong> {movie.vote_average} ({movie.vote_count}{" "}
            lượt đánh giá)
          </p>
          <p>
            <strong>Ngôn ngữ:</strong> {movie.original_language.toUpperCase()}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieCard;
