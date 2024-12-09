import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Alert } from "react-bootstrap";
import TvShowSearch from "../components/TvShowSearch";
import TvShowCard from "../components/TvShowCard";
import DefaultPagination from "../components/DefaultPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTv,
  faCircleExclamation,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URL = "https://api.themoviedb.org/3/search/tv";
  const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";

  useEffect(() => {
    const fetchTvShows = async () => {
      if (!searchQuery) return;

      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_URL}`;
        const { data } = await axios.get(url, {
          params: {
            query: searchQuery,
            api_key: API_KEY,
            page: currentPage,
            language: "vi",
          },
        });

        setTvShows(data.results);
        console.log(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching TV Show data:", error);
        setError(`Failed to fetch TV Show data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, [searchQuery, currentPage]);

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

    if (!loading && tvShows.length === 0 && searchQuery) {
      return (
        <Alert variant="warning" className="mt-3">
          <FontAwesomeIcon icon={faCircleExclamation} className="me-2" />
          Không có phim bộ nào phù hợp với từ khóa "{searchQuery}".
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
      <h1 className="my-4">
        <FontAwesomeIcon icon={faTv} className="me-2" />
        Phim bộ
      </h1>
      <TvShowSearch
        setSearchQuery={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // Reset to first page on new search
        }}
        resetTvShows={() => setTvShows([])}
      />
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

export default TvShows;
