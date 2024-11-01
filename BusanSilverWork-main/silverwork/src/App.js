import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import ListPage from "./pages/ListPage";
import ResumePage from "./pages/ResumePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
