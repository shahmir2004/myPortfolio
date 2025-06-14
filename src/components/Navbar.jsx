// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { NavLink } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import './Navbar.css';

// Simple Hamburger Icon (can be replaced with SVG or icon library)
const HamburgerIcon = () => (
  <svg viewBox="0 0 100 80" width="25" height="25" fill="var(--text-primary)"> {/* Use CSS var for fill */}
    <rect width="100" height="15" rx="8"></rect>
    <rect y="30" width="100" height="15" rx="8"></rect>
    <rect y="60" width="100" height="15" rx="8"></rect>
  </svg>
);

const CloseIcon = () => ( // Simple X icon
    <svg viewBox="0 0 100 100" width="25" height="25" fill="var(--text-primary)">
        <rect x="10" y="42.5" width="100" height="15" rx="8" transform="translate(0,0) rotate(45 50 50)"/>
        <rect x="10" y="42.5" width="100" height="15" rx="8" transform="translate(0,0) rotate(-45 50 50)"/>
    </svg>
);


function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navMenuRef = useRef(null); // Ref for the mobile menu for click outside

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Click outside to close mobile menu
    const handleClickOutside = (event) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        // Check if the click was on the toggle button itself
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        if (toggleButton && toggleButton.contains(event.target)) {
          return; // Don't close if clicking the toggle button
        }
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]); // Add mobileMenuOpen to dependency array

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => { // Function to close menu when a link is clicked
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open-navbar-background' : ''}`}>
      <div className="container navbar-container">
        <NavLink to="/" className="navbar-brand" onClick={closeMobileMenu}>
            Shahmir Ahmed
        </NavLink>

        {/* Mobile Menu Toggle Button - visible only on mobile via CSS */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-expanded={mobileMenuOpen} aria-label="Toggle navigation">
          {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* Navigation links and Theme Toggle */}
        {/* This div will be controlled by the .open class on mobile */}
        <div
            ref={navMenuRef} // Add ref here
            className={`navbar-links-and-toggle ${mobileMenuOpen ? 'open' : ''}`}
        >
          <ul className="navbar-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMobileMenu}>Home</NavLink></li>
            <li><NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMobileMenu}>Projects</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMobileMenu}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMobileMenu}>Contact</NavLink></li>
          </ul>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;