// src/pages/AboutPage.jsx
import React from 'react';
import './AboutPage.css'; // Create this file

function AboutPage() {
  return (
    <div className="about-section">
      <h2>About Me</h2>
      <p>
        Hello! I'm [Your Name], a driven and enthusiastic final-year Computer Science student
        with a strong foundation in software development, particularly in web technologies.
        I'm fascinated by the power of code to solve real-world problems and create meaningful user experiences.
      </p>
      <p>
        My journey into tech started with [mention something specific, e.g., a curiosity for how websites work, a small coding project].
        Since then, I've dived deep into learning languages like JavaScript and Python, and frameworks like React.
        I'm always eager to learn new technologies and methodologies.
      </p>
      <h3>Skills</h3>
      <div className="skills-grid">
        {/* You can make this more dynamic or just list them */}
        <div className="skill-category">
          <h4>Languages</h4>
          <ul>
            <li>JavaScript (ES6+)</li>
            <li>Python</li>
            <li>HTML5</li>
            <li>CSS3</li>
            {/* Add more */}
          </ul>
        </div>
        <div className="skill-category">
          <h4>Frameworks/Libraries</h4>
          <ul>
            <li>React</li>
            <li>Node.js (Express.js) - if applicable</li>
            <li>Flask/Django - if applicable</li>
            {/* Add more */}
          </ul>
        </div>
        <div className="skill-category">
          <h4>Tools & Platforms</h4>
          <ul>
            <li>Git & GitHub</li>
            <li>VS Code</li>
            <li>Vercel/Netlify</li>
            {/* Add more */}
          </ul>
        </div>
      </div>
      {/* Add sections for Education, Experience (if any), Hobbies (optional) */}
    </div>
  );
}
export default AboutPage;