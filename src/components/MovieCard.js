import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faTimes,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import countries from "../data/countries";
import languages from "../data/languages";
import "./MovieCard.css";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const PLACEHOLDER_IMAGE = "https://dummyimage.com/260x200/cccccc/555555.png";

const MovieCard = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/${movieId}`, {
          params: { api_key: API_KEY, language: "vi" },
        });
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/${movieId}/videos`, {
          params: { api_key: API_KEY },
        });

        // Find the trailer video from the results
        const trailer = data.results.find((video) => video.type === "Trailer");

        // If trailer exists, set the trailer URL, otherwise set an empty string or handle error
        if (trailer) {
          const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
          setTrailer(trailerUrl); // Assuming setTrailer is used to set the trailer URL
        } else {
          console.error("Trailer not found");
          setTrailer(""); // or any default value if no trailer found
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error.message);
      }
    };

    fetchMovieTrailer();
  }, [movieId]);

  const getMoviePoster = (movie) => {
    if (movie?.poster_path) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    return `${PLACEHOLDER_IMAGE}&text=${encodeURIComponent(
      movie?.title || "Movie"
    ).replace(/%20/g, "+")}`;
  };

  const getReleaseYear = (releaseDate) => releaseDate?.split("-")[0] || "N/A";

  const formatVietnameseDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      console.error("Invalid date:", date);
      return "Invalid date";
    }
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(parsedDate);
  };

  const getGenres = (genres) =>
    genres?.length ? genres.map((genre) => genre.name).join(", ") : "N/A";

  const getCountry = (originCountries) => {
    const countryNames = originCountries
      .map((originCountry) => {
        const country = countries.find((c) => c.code === originCountry);
        return country ? country.name : originCountry || "N/A";
      })
      .filter((name) => name !== "N/A"); // Filter out "N/A" values if any

    return countryNames.length > 1
      ? countryNames.join(", ")
      : countryNames[0] || "N/A";
  };

  const getLanguage = (originalLanguage) => {
    const language = languages.find((lang) => lang.code === originalLanguage);
    return language ? language.name : originalLanguage || "N/A";
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
            src={getMoviePoster(movie)}
            alt={movie.title}
            className="rounded-top w-100"
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              <strong>Năm ra mắt:</strong> {getReleaseYear(movie.release_date)}
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
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={getMoviePoster(movie)}
            alt={movie.title}
            className="img-fluid rounded mb-3 w-100"
          />
          <p>
            <strong>Khẩu hiệu:</strong> {movie.tagline || "Không có khẩu hiệu."}
          </p>
          <p>
            <strong>Tóm tắt:</strong> {movie.overview || "Không có tóm tắt."}
          </p>
          <p>
            <strong>Ngày ra mắt:</strong>{" "}
            {formatVietnameseDate(movie.release_date) || "N/A"}
          </p>
          <p>
            <strong>Thể loại:</strong> {getGenres(movie.genres)}
          </p>
          <p>
            <strong>Đánh giá:</strong> {movie.vote_average} ({movie.vote_count}{" "}
            lượt đánh giá)
          </p>
          <p>
            <strong>Quốc gia:</strong> {getCountry(movie.origin_country)}
          </p>
          <p>
            <strong>Ngôn ngữ:</strong> {getLanguage(movie.original_language)}
          </p>

          {/* Trailer Section */}
          {trailer && (
            <div className="mb-3">
              <h5>Trailer:</h5>
              <iframe
                width="100%"
                height="400"
                src={trailer}
                title={movie.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
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
