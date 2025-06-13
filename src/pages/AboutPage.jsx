import React from 'react';
import { motion } from 'framer-motion';
import './AboutPage.css';

const sectionVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function AboutPage() {
  const skills = {
    languages: ["JavaScript (ES6+)", "Python", "HTML5", "CSS3", "SQL"],
    frameworks: ["React", "Node.js (Express)", "Flask", "Framer Motion"],
    tools: ["Git & GitHub", "VS Code", "Figma (Basic)", "Docker (Basic)"],
  };

  return (
    <motion.div
      className="about-page page-section"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <motion.h2 variants={itemVariants} className="text-center page-title">About Me</motion.h2>
        <div className="about-content">
          <motion.div variants={itemVariants} className="about-text">
            <p>
              Hello! I'm Shahmir Ahmed, a passionate and detail-oriented final-year Computer Science student
              with a strong enthusiasm for building elegant and effective web solutions. I thrive on transforming complex problems
              into intuitive and enjoyable user experiences.
            </p> {/* UPDATED */}
            
            <p>
              Beyond coding, I enjoy hitting the gym and staying healthy, this is one area in which i have selective experiences and have researched well.
              I'm eager to contribute to innovative projects and collaborate with talented teams.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="skills-section">
            <h3>My Skills</h3>
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="skill-category">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <ul className="skills-list">
                  {skillList.map(skill => (
                    <motion.li key={skill} variants={itemVariants}>{skill}</motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
export default AboutPage;