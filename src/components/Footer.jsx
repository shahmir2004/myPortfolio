import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} Shahmir Ahmed. All rights reserved.</p> {/* UPDATED */}
        <div className="social-links">
          <a href="https://github.com/shahmir2004" target="_blank" rel="noopener noreferrer">GitHub</a> {/* UPDATED */}
          <a href="https://www.linkedin.com/in/shahmir-ahmed-a89790294/" target="_blank" rel="noopener noreferrer">LinkedIn</a> {/* UPDATED */}
        </div>
      </div>
    </footer>
  );
}
export default Footer;