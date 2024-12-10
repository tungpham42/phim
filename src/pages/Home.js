import React from "react";
import "./Home.css";
import TrendingMovies from "../components/TrendingMovies";
import TrendingTvShows from "../components/TrendingTvShows";
import { Helmet } from "react-helmet";

const Home = ({ headTitle }) => {
  return (
    <>
      <Helmet>
        <title>{headTitle}</title>
        <meta property="og:title" content={headTitle} />
      </Helmet>
      <h1>Chào mừng quý khách đến với Kho Phim!</h1>
      <TrendingMovies />
      <hr></hr>
      <TrendingTvShows />
    </>
  );
};

export default Home;
