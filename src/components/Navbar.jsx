// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // Optional: State for mobile menu toggle
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <NavLink to="/" className="navbar-brand">Shahmir Ahmed</NavLink>
        {/* Add mobile menu toggle button here if needed */}
        {/* <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>☰</button> */}
        <div className={`navbar-links-and-toggle ${/*mobileMenuOpen ? 'open' : ''*/''}`}>
          <ul className="navbar-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
            <li><NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Projects</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink></li>
          </ul>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;