// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import ParticleBackground from '../components/ParticleBackground'; // Assuming ParticleBackground is preferred
// import InteractiveBlobCanvas from '../components/InteractiveBlob'; // Or this if you switched back
import './HomePage.css';

// --- Animation Variants ---
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18, // Fine-tuned stagger
      delayChildren: 0.2,
    },
  },
};

const itemFadeInUpVariants = {
  hidden: { opacity: 0, y: 28 }, // Consistent starting y
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "circOut" }, // Consistent ease
  },
};

export const buttonHoverTapVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 7px 20px rgba(var(--brand-primary-rgb), 0.3)",
    transition: { type: "spring", stiffness: 350, damping: 15 },
  },
  tap: { scale: 0.95 },
};

const sectionScrollRevealVariants = {
  hidden: { opacity: 0, y: 55, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 },
  },
};

// scrollItemVariants can be the same as itemFadeInUpVariants for consistency
const scrollItemVariants = itemFadeInUpVariants;


function HomePage() {
  const featuredProjects = [
    { id: 1, title: "Staff-Flow AI", path: "/projects" }, // Update with actual paths if you have detail pages, e.g., /projects/1
    { id: 2, title: "Secure MNIST ZTA", path: "/projects" },
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shahmir Ahmed",
    "jobTitle": "Software Developer",
    "description": "Creative Software Developer and Programmer specializing in AI/ML, Full-Stack Development, and Cybersecurity",
    "url": "https://shahmirahmad.vercel.app/",
    "knowsAbout": ["Software Development", "Programming", "AI/ML", "Full-Stack Development", "React", "Python", "Node.js"]
  };

  return (
    <div className="homepage-wrapper">
      <SEO 
        title="Shahmir Ahmed | Software Developer & Programmer | Portfolio"
        description="Shahmir Ahmed - Creative Software Developer and Programmer. CS Student specializing in AI/ML, Full-Stack Development, Cybersecurity. Explore innovative projects in React, Python, Node.js."
        keywords="Shahmir Ahmed, Programmer, Software Developer, Full-Stack Developer, Web Developer, AI Engineer, React, Python, Node.js, Portfolio"
        url="/"
        schemaMarkup={homeSchema}
      />
      {/* <InteractiveBlobCanvas /> OR <ParticleBackground /> */}
      <ParticleBackground /> {/* Defaulting to ParticleBackground */}

      {/* Hero Section */}
      <motion.section
        className="hero-section" // Simplified class name
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container hero-content-container"> {/* Specific container for hero content */}
          <motion.h1 variants={itemFadeInUpVariants} className="hero-title text-shadow-strong">
            Shahmir Ahmed
          </motion.h1>
          <motion.h2 variants={itemFadeInUpVariants} className="hero-subtitle text-shadow-soft">
            Creative Web Developer & CS Student
          </motion.h2>
          <motion.p variants={itemFadeInUpVariants} className="hero-description text-shadow-soft">
            Transforming ideas into modern, engaging digital experiences with a passion for clean code and intuitive design.
          </motion.p>
          <motion.div variants={itemFadeInUpVariants}>
            <Link to="/projects">
              <motion.button
                className="btn btn-primary hero-cta"
                variants={buttonHoverTapVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Explore My Work
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Intro Section */}
      <motion.section
        className="intro-section content-section-overlay" // Using .content-section-overlay from index.css
        variants={sectionScrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container text-center"> {/* Generic text-center utility */}
          <motion.h2 variants={scrollItemVariants} className="section-title text-shadow-soft">
            Welcome to My Digital Playground!
          </motion.h2>
          <motion.p variants={scrollItemVariants} className="section-subtitle">
            I specialize in building responsive, user-centric web applications. Let's explore how technology can bring your vision to life.
          </motion.p>
          <motion.div variants={scrollItemVariants}>
            <Link to="/about">
              <motion.button
                className="btn btn-outline intro-cta"
                variants={buttonHoverTapVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Discover My Journey
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Projects Teaser Section */}
      <motion.section
        className="featured-teaser-section page-section-themed" // Uses .page-section-themed from index.css (if you created it) or define locally
        variants={sectionScrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="container text-center">
          <motion.h2 variants={scrollItemVariants} className="section-title text-shadow-soft">
            Featured Creations
          </motion.h2>
          <motion.p variants={scrollItemVariants} className="section-subtitle">
            A quick look at some projects I've enjoyed building.
          </motion.p>
          <motion.div className="teaser-links" variants={staggerContainerVariants}> {/* Stagger links */}
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={itemFadeInUpVariants}>
                <Link to={project.path} className="teaser-project-link text-shadow-soft">
                  {project.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={scrollItemVariants} style={{ marginTop: '2.5rem' }}>
            <Link to="/projects">
              <motion.button
                className="btn btn-primary"
                variants={buttonHoverTapVariants}
                whileHover="hover"
                whileTap="tap"
              >
                See All Projects
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Final Call To Action Section */}
      <motion.section
        className="final-cta-section content-section-overlay" // Uses .content-section-overlay from index.css
        variants={sectionScrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container text-center">
          <motion.h2 variants={scrollItemVariants} className="section-title text-shadow-soft">
            Have an Idea or Opportunity?
          </motion.h2>
          <motion.p variants={scrollItemVariants} className="section-subtitle">
            I'm always excited to discuss new projects, collaborations, or innovative ideas. Let's connect!
          </motion.p>
          <motion.div variants={scrollItemVariants}>
            <Link to="/contact">
              <motion.button
                className="btn btn-primary final-cta-btn"
                variants={buttonHoverTapVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Let's Talk
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <div style={{ height: '10vh' }}></div> {/* Minimal spacer */}
    </div>
  );
}

export default HomePage;