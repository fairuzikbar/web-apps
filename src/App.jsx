import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplitBill from "./pages/SplitBill";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/split-bill" element={<SplitBill />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
