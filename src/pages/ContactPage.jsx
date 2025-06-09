// src/pages/ContactPage.jsx
import React from 'react';
import './ContactPage.css'; // Create this file

function ContactPage() {
  return (
    <div className="contact-section">
      <h2>Get In Touch</h2>
      <p>
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
        Feel free to reach out!
      </p>
      <div className="contact-methods">
        <p><strong>Email:</strong> <a href="mailto:your.email@example.com">your.email@example.com</a></p>
        <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">linkedin.com/in/yourprofile</a></p>
        <p><strong>GitHub:</strong> <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">github.com/yourusername</a></p>
      </div>
      {/*
        Later, you can add a contact form here using a service like Formspree
        or by building a backend with Python/Flask.
      */}
    </div>
  );
}
export default ContactPage;