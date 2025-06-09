// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Create this file

function HomePage() {
  return (
    <div className="home-hero">
      <h1>Hi, I'm [Your Name]</h1>
      <p className="tagline">A Final-Year Computer Science Student Passionate About Building Innovative Web Solutions & SaaS Products.</p>
      <p>I specialize in React and Python, creating intuitive and efficient applications.</p>
      <Link to="/projects" className="cta-button">View My Work</Link>
      {/* You can add a profile picture here too */}
    </div>
  );
}
export default HomePage;