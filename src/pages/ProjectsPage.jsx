import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../projectData'; // Your project data
import './ProjectsPage.css'; // You will create and style this

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease:"easeOut" } }
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};


function ProjectsPage() {
  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Shahmir Ahmed's Projects",
    "description": "Portfolio of software development and programming projects by Shahmir Ahmed",
    "creator": {
      "@type": "Person",
      "name": "Shahmir Ahmed"
    }
  };

  return (
    <div className="projects-page page-section">
      <SEO 
        title="Projects | Shahmir Ahmed - Software Developer Portfolio"
        description="Explore Shahmir Ahmed's software development projects including Staff-Flow AI, Secure MNIST ZTA, FYP Management Database, and more. Full-Stack, AI/ML, and Cybersecurity projects."
        keywords="Shahmir Ahmed Projects, Portfolio, Software Developer Projects, Programmer Work, AI Projects, Full-Stack Projects, React Projects, Python Projects"
        url="/projects"
        schemaMarkup={projectsSchema}
      />
      <div className="container">
        <motion.div variants={headerVariants} initial="hidden" animate="visible">
          <h2 className="text-center page-title">My Portfolio Projects</h2>
          <p className="text-center page-subtitle">
            A selection of my work. Click to learn more or view the code.
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible" // Animate when page loads, not on scroll for the whole grid
          >
            {projects.map(project => (
              <motion.div key={project.id} variants={itemVariants} className="project-grid-item">
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center">No projects to display yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
export default ProjectsPage;