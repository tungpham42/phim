import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Alert } from "react-bootstrap";
import MovieCard from "./MovieCard";
import DefaultPagination from "./DefaultPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URL = "https://api.themoviedb.org/3/trending/movie/week";
  const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";

  useEffect(() => {
    const fetchMovies = async () => {
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

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setError(`Failed to fetch movie data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
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

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movieId={movie.id} />);

  return (
    <Container>
      {renderAlert()}
      {!loading && movies.length > 0 && (
        <>
          <Row className="mt-3">{renderMovies()}</Row>
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

export default AllMovies;
