import React, { useEffect } from "react";
import "./Home.css";
import TrendingMovies from "../components/TrendingMovies";
import TrendingTvShows from "../components/TrendingTvShows";

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <h1>Chào mừng quý khách đến với Kho Phim!</h1>
      <TrendingMovies />
      <hr></hr>
      <TrendingTvShows />
    </>
  );
};

export default Home;
