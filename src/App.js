import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/header";
import MovieDetail from "./pages/MovieDetail";
import ProfilePage from "./pages/ProfilePage"; // Import your ProfilePage component
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" activeClassName="active">
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
