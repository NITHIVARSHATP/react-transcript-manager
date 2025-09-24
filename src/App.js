import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TranscriptManagerPage from "./pages/TransacriptManagerPage";
import AccuracyAnalyserPage from "./pages/AccuracyAnalyserPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<TranscriptManagerPage />} />
            <Route path="/accuracy" element={<AccuracyAnalyserPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
