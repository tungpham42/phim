import React, { useState, useEffect, useCallback } from "react";
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
import "./TvShowCard.css";

const BASE_URL = "https://api.themoviedb.org/3/tv";
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const PLACEHOLDER_IMAGE = "https://dummyimage.com/260x200/cccccc/555555.png";

const TvShowCard = ({ tvShowId }) => {
  const [tvShow, setTvShow] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch TV show details
  const fetchTvShowDetails = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${tvShowId}`, {
        params: { api_key: API_KEY, language: "vi" },
      });
      setTvShow(data);
    } catch (error) {
      console.error("Error fetching TV show details:", error.message);
    }
  }, [tvShowId]);

  // Fetch TV show trailer
  const fetchTvShowTrailer = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${tvShowId}/videos`, {
        params: { api_key: API_KEY },
      });
      const trailerData = data.results.find(
        (video) => video.type === "Trailer"
      );
      setTrailer(
        trailerData ? `https://www.youtube.com/embed/${trailerData.key}` : ""
      );
    } catch (error) {
      console.error("Error fetching TV show trailer:", error.message);
    }
  }, [tvShowId]);

  useEffect(() => {
    fetchTvShowDetails();
    fetchTvShowTrailer();
  }, [fetchTvShowDetails, fetchTvShowTrailer]);

  // Utility functions
  const getPosterUrl = (posterPath, title) =>
    posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : `${PLACEHOLDER_IMAGE}&text=${encodeURIComponent(title || "TvShow")}`;

  const getFormattedYear = (date) => date?.split("-")[0] || "N/A";

  const formatVietnameseDate = (date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatList = (list, formatter) =>
    list?.length ? list.map(formatter).join(", ") : "N/A";

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

  const getLanguageName = (languageCode) =>
    languages.find((lang) => lang.code === languageCode)?.name ||
    languageCode ||
    "N/A";

  if (!tvShow) return null;

  const imdbLink = tvShow.imdb_id
    ? `https://www.imdb.com/title/${tvShow.imdb_id}`
    : null;

  return (
    <>
      {/* TV Show Card */}
      <Col lg={3} md={4} sm={6} className="mb-4">
        <Card className="h-100 movie-card rounded shadow-lg">
          <Card.Img
            variant="top"
            src={getPosterUrl(tvShow.poster_path, tvShow.original_name)}
            alt={tvShow.original_name}
            className="rounded-top w-100"
          />
          <Card.Body>
            <Card.Title>{tvShow.original_name}</Card.Title>
            <Card.Text>
              <strong>Năm ra mắt:</strong>{" "}
              {getFormattedYear(tvShow.first_air_date)}
            </Card.Text>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowModal(true)}
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
                className="ms-2"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                IMDb
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* Modal for TV Show Details */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{tvShow.original_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={getPosterUrl(tvShow.poster_path, tvShow.original_name)}
            alt={tvShow.original_name}
            className="img-fluid rounded mb-3 w-100"
          />
          <p>
            <strong>Khẩu hiệu:</strong>{" "}
            {tvShow.tagline || "Không có khẩu hiệu."}
          </p>
          <p>
            <strong>Tóm tắt:</strong> {tvShow.overview || "Không có tóm tắt."}
          </p>
          <p>
            <strong>Ngày ra mắt:</strong>{" "}
            {formatVietnameseDate(tvShow.first_air_date) || "N/A"}
          </p>
          <p>
            <strong>Ngày kết thúc:</strong>{" "}
            {formatVietnameseDate(tvShow.last_air_date) || "N/A"}
          </p>
          <p>
            <strong>Thể loại:</strong>{" "}
            {formatList(tvShow.genres, (genre) => genre.name)}
          </p>
          <p>
            <strong>Đánh giá:</strong> {tvShow.vote_average} (
            {tvShow.vote_count} lượt đánh giá)
          </p>
          <p>
            <strong>Quốc gia:</strong> {getCountry(tvShow.origin_country)}
          </p>
          <p>
            <strong>Ngôn ngữ:</strong>{" "}
            {getLanguageName(tvShow.original_language)}
          </p>
          {trailer && (
            <div className="mb-3">
              <h5>Trailer:</h5>
              <iframe
                width="100%"
                height="400"
                src={trailer}
                title={tvShow.original_name}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TvShowCard;
