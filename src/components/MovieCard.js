import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faTimes,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const PLACEHOLDER_IMAGE = "https://dummyimage.com/260x200/cccccc/555555.png";

const MovieCard = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "vi",
          },
        });
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const getMoviePoster = () => {
    return movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : `${PLACEHOLDER_IMAGE}&text=${encodeURIComponent(
          movie?.title || "Movie"
        ).replace(/%20/g, "+")}`;
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  if (!movie) return null;

  const imdbLink = movie.imdb_id
    ? `https://www.imdb.com/title/${movie.imdb_id}`
    : null;

  return (
    <>
      {/* Movie Card */}
      <Col lg={3} md={4} sm={6} className="mb-4">
        <Card className="h-100 movie-card rounded shadow-lg">
          <Card.Img
            variant="top"
            src={getMoviePoster()}
            alt={movie.title}
            className="rounded-top"
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              <strong>Năm ra mắt:</strong>{" "}
              {movie.release_date?.split("-")[0] || "N/A"}
            </Card.Text>
            <Button
              variant="primary"
              size="sm"
              onClick={handleShow}
              className="me-2"
            >
              <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
              Chi tiết
            </Button>
            {imdbLink && (
              <Button
                variant="warning"
                size="sm"
                href={imdbLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                IMDb
              </Button>
            )}
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
            src={getMoviePoster()}
            alt={movie.title}
            className="img-fluid rounded mb-3"
          />
          <p>
            <strong>Khẩu hiệu:</strong>{" "}
            {movie.tagline || "No tagline available."}
          </p>
          <p>
            <strong>Tóm tắt:</strong>{" "}
            {movie.overview || "No description available."}
          </p>
          <p>
            <strong>Ngày ra mắt:</strong> {movie.release_date || "N/A"}
          </p>
          <p>
            <strong>Thể loại:</strong>{" "}
            {movie.genres?.length
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Đánh giá:</strong> {movie.vote_average} ({movie.vote_count}{" "}
            lượt đánh giá)
          </p>
          <p>
            <strong>Ngôn ngữ:</strong> {movie.original_language?.toUpperCase()}
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
