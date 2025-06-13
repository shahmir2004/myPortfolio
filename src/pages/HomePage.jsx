// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveBlobCanvas from '../components/InteractiveBlob';
import './HomePage.css';

// --- Animation Variants ---

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemFadeInUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    // CORRECTED Easing: Using a standard string or a valid Framer Motion easing function.
    // Let's use "circOut" for a nice effect, or you can try "easeOut", "anticipate"
    // or remove 'ease' to use the default tween easing.
    transition: { duration: 0.6, ease: "circOut" },
  },
};

const buttonHoverTapVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 7px 20px rgba(var(--brand-primary-rgb), 0.3)",
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
};

const sectionScrollRevealVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 }, // Slightly adjusted initial state
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.12 }, // Adjusted timing
  },
};

// Variants for individual elements within scroll sections for a slight stagger
const scrollItemVariants = { // This is the same as itemFadeInUpVariants, can be reused
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "circOut" } } // Consistent easing
};


function HomePage() {
  const featuredProjects = [
    { id: 1, title: "Staff-Flow AI", path: "/projects" },
    { id: 2, title: "Secure MNIST ZTA", path: "/projects" },
  ];

  return (
    <div className="homepage-wrapper">
      <InteractiveBlobCanvas />

      {/* Hero Section */}
      <motion.section
        className="hero-section-revamped"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container hero-content-revamped"> {/* Ensure .container class is applied for max-width & padding */}
          <motion.h1 variants={itemFadeInUpVariants} className="hero-title-revamped text-shadow-soft">
            Hi, I'm Shahmir Ahmed
          </motion.h1>
          <motion.p variants={itemFadeInUpVariants} className="hero-tagline-revamped text-shadow-soft">
            A Creative Web Developer & Computer Science Student <br />
            Crafting Modern Digital Experiences.
          </motion.p>
          <motion.div variants={itemFadeInUpVariants}>
            <Link to="/projects">
              <motion.button
                className="btn btn-primary hero-cta-revamped"
                variants={buttonHoverTapVariants} // For hover/tap
                whileHover="hover"
                whileTap="tap"
                // Initial animation is handled by itemFadeInUpVariants from parent
              >
                Explore My Work
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Intro Section */}
      <motion.section
        className="intro-section-revamped content-section-overlay"
        variants={sectionScrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container text-center-revamped"> {/* Ensure .container class is applied */}
          <motion.h2 variants={scrollItemVariants} className="section-title-revamped text-shadow-soft">
            Welcome to My Digital Playground!
          </motion.h2>
          <motion.p variants={scrollItemVariants} className="section-subtitle-revamped"> {/* Removed inline transition, handled by variant */}
            I'm passionate about transforming ideas into elegant, user-centric web applications. With a strong foundation in Computer Science and a love for modern design, I strive to build solutions that are not only functional but also delightful to use.
          </motion.p>
          <motion.div variants={scrollItemVariants}> {/* Removed inline transition */}
            <Link to="/about">
              <motion.button
                className="btn btn-outline intro-cta-revamped"
                variants={buttonHoverTapVariants} // For hover/tap
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
        className="featured-teaser-revamped page-section-themed"
        variants={sectionScrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="container text-center-revamped"> {/* Ensure .container class is applied */}
          <motion.h2 variants={scrollItemVariants} className="section-title-revamped text-shadow-soft">
            A Glimpse of My Work
          </motion.h2>
          <motion.p variants={scrollItemVariants} className="section-subtitle-revamped">
            Here are a couple of projects I'm particularly proud of. Dive deeper to see the full scope!
          </motion.p>
          <motion.div className="teaser-links-revamped" variants={staggerContainerVariants}> {/* Stagger the links themselves */}
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={itemFadeInUpVariants}> {/* Each link uses item variant */}
                <Link to={project.path} className="teaser-project-link-revamped text-shadow-soft">
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
                View All Projects
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Final Call To Action Section */}
      <motion.section
        className="final-cta-revamped content-section-overlay"
        variants={sectionScrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container text-center-revamped"> {/* Ensure .container class is applied */}
          <motion.h2 variants={scrollItemVariants} className="section-title-revamped text-shadow-soft">
            Let's Build Something Amazing Together
          </motion.h2>
          <motion.p variants={scrollItemVariants} className="section-subtitle-revamped">
            Whether you have a project idea, a question, or just want to connect, I'm always open to new opportunities and collaborations.
          </motion.p>
          <motion.div variants={scrollItemVariants}>
            <Link to="/contact">
              <motion.button
                className="btn btn-primary final-cta-btn-revamped"
                variants={buttonHoverTapVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <div style={{ height: '15vh' }}></div>
    </div>
  );
}

export default HomePage;