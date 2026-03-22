import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsernamePage from "./pages/UsernamePage";
import LandingPage from "./pages/LandingPage";
import RepoPage from "./pages/RepoPage";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/UsernamePage" element={<UsernamePage />} />
        <Route path="/RepoPage" element={<RepoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

