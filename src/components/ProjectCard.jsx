// src/components/ProjectCard.jsx
import React from 'react';
import './ProjectCard.css';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <img src={project.imageUrl} alt={project.title} className="project-image" />
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>}
          {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">View Code</a>}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;