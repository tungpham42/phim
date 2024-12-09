import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Alert } from "react-bootstrap";
import TvShowCard from "./TvShowCard";
import DefaultPagination from "./DefaultPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faSpinner,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

const TrendingTvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URL = "https://api.themoviedb.org/3/trending/tv/day";
  const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";

  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_URL}`;
        const { data } = await axios.get(url, {
          params: {
            api_key: API_KEY,
            page: currentPage,
            language: "vi",
          },
        });

        setTvShows(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching tvShow data:", error);
        setError(`Failed to fetch tvShow data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderAlert = () => {
    if (loading) {
      return (
        <Alert variant="info" className="mt-3">
          <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
          Đang tải...
        </Alert>
      );
    }

    if (error) {
      return (
        <Alert variant="danger" className="mt-3">
          <FontAwesomeIcon icon={faCircleExclamation} className="me-2" />
          {error}
        </Alert>
      );
    }

    return null;
  };

  const renderTvShows = () =>
    tvShows.map((tvShow) => (
      <TvShowCard key={tvShow.id} tvShowId={tvShow.id} />
    ));

  return (
    <Container>
      <h2>
        <FontAwesomeIcon icon={faTv} className="me-2" />
        Phim bộ
      </h2>
      {renderAlert()}
      {!loading && tvShows.length > 0 && (
        <>
          <Row className="mt-3">{renderTvShows()}</Row>
          <DefaultPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default TrendingTvShows;
