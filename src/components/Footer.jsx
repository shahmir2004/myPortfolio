// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {currentYear} Your Name. All rights reserved.</p>
      {/* Optional: Add social media links here */}
    </footer>
  );
}
export default Footer;