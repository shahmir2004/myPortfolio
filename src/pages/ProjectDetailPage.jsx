// src/pages/ProjectDetailPage.jsx
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { projects } from '../projectData';
import './ProjectDetailPage.css';

const pageContentVariants = {
  hidden: { opacity: 0, y: 25 }, // Slightly less Y offset
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } // Slightly faster
};

const imageContainerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1, ease: "circOut" } }
};

function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === parseInt(projectId));

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.shortDescription,
    "author": {
      "@type": "Person",
      "name": "Shahmir Ahmed"
    },
    "creator": {
      "@type": "Person",
      "name": "Shahmir Ahmed"
    },
    "keywords": project.tags.join(", "),
    "url": project.liveUrl || `https://shahmirahmad.vercel.app/projects/${projectId}`,
    "image": project.imageUrl
  };

  return (
    <motion.div
      className="project-detail-page page-section"
      initial="hidden"
      animate="visible"
      // Stagger children within the page itself, main transition by App.jsx
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
    >
      <SEO 
        title={`${project.title} | Shahmir Ahmed - Software Developer`}
        description={`${project.shortDescription} - A project by Shahmir Ahmed, Software Developer and Programmer. ${project.description.substring(0, 100)}...`}
        keywords={`Shahmir Ahmed, ${project.title}, ${project.tags.join(", ")}, Software Developer Project, Programmer Portfolio`}
        url={`/projects/${projectId}`}
        image={project.imageUrl}
        schemaMarkup={projectSchema}
      />
      <div className="container">
        <motion.div variants={pageContentVariants} className="project-detail-header">
          <h1 className="project-title-detail text-shadow-soft">{project.title}</h1>
          {project.role && <p className="project-role-detail"><strong>My Role:</strong> {project.role}</p>}
          <div className="project-links-detail">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>}
            {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">View Code</a>}
          </div>
        </motion.div>

        {/* Display 2D Project Image */}
        {project.imageUrl && (
          <motion.div
            variants={imageContainerVariants}
            className="project-detail-image-container"
          >
            <img src={project.imageUrl} alt={`${project.title} preview`} className="project-detail-image" />
          </motion.div>
        )}

        <motion.div variants={pageContentVariants} className="project-section-detail content-section-overlay">
          <h3>About This Project</h3>
          {/* Ensure description is treated as a block of text, or split if it has intentional newlines */}
          <div className="project-description-text" dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br />') }}></div>
          {/* Or if no HTML is in description:
          {project.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          */}
        </motion.div>

        {/* Challenges Section */}
        {project.challenges && (
          <motion.div variants={pageContentVariants} className="project-section-detail content-section-overlay">
            <h3>Challenges Overcome</h3>
            <p>{project.challenges}</p>
          </motion.div>
        )}

        {/* Learnings Section */}
        {project.learnings && (
          <motion.div variants={pageContentVariants} className="project-section-detail content-section-overlay">
            <h3>Key Learnings</h3>
            <p>{project.learnings}</p>
          </motion.div>
        )}

        {project.client && (
            <motion.div variants={pageContentVariants} className="project-section-detail content-section-overlay">
                <h3>Client / Context</h3>
                <p>{project.client}</p>
            </motion.div>
        )}

        <motion.div variants={pageContentVariants} className="project-section-detail content-section-overlay">
          <h3>Technologies Used</h3>
          <div className="tags-container">
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={pageContentVariants} style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/projects" className="btn">← Back to All Projects</Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProjectDetailPage;