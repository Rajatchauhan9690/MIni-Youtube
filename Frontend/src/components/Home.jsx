import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-background-container">
      <div className="home-background">
        <header className="home-navbar">
          <div className="home-logo">LOGO</div>
          <div className="home-auth-buttons">
            <Link to="/login" className="home-btn">
              Login
            </Link>
            <Link to="/register" className="home-btn signup-btn">
              Signup
            </Link>
          </div>
        </header>
      </div>

      <div className="home-container">
        <Link to="/dashboard/:id" className="home-cta-btn">
          Get Started
        </Link>
        <h1>Your One Stop Solution for Education</h1>
        <p>
          Find the right courses, compare universities, and shape your future.
        </p>
      </div>
    </div>
  );
};

export default Home;
