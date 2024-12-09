import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home title="Trang chủ - Kho phim" />} />
          <Route
            path="phim-chieu-rap"
            element={<Movies title="Phim chiếu rạp - Kho phim" />}
          />
          <Route
            path="phim-bo"
            element={<TvShows title="Phim bộ - Kho phim" />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
