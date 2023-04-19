import React from "react";
import { Routes, Route } from "react-router-dom";
import Books from "./components/Books";
import Header from "./components/Header/Header";
import MapRef from "./components/map/MapRef";
import MapPage from "./pages/MapPage";

const Main = () => {
  return (
    <div className="main">
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/map2" element={<MapRef />} />
      </Routes>
    </div>
  );
};

export default Main;
