import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Alert } from "react-bootstrap";
import MovieSearch from "../components/MovieSearch";
import MovieCard from "../components/MovieCard";
import DefaultPagination from "../components/DefaultPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faCircleExclamation,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

const Movies = ({ headTitle }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URL = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";

  useEffect(() => {
    const fetchMovies = async () => {
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

    if (!loading && movies.length === 0 && searchQuery) {
      return (
        <Alert variant="warning" className="mt-3">
          <FontAwesomeIcon icon={faCircleExclamation} className="me-2" />
          Không có phim nào phù hợp với từ khóa "{searchQuery}".
        </Alert>
      );
    }

    return null;
  };

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movieId={movie.id} />);

  return (
    <>
      <Helmet>
        <title>{headTitle}</title>
        <meta property="og:title" content={headTitle} />
      </Helmet>
      <Container>
        <h1 className="my-4">
          <FontAwesomeIcon icon={faFilm} className="me-2" />
          Phim chiếu rạp
        </h1>
        <MovieSearch
          setSearchQuery={(query) => {
            setSearchQuery(query);
            setCurrentPage(1); // Reset to first page on new search
          }}
          resetMovies={() => setMovies([])}
        />
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
    </>
  );
};

export default Movies;
