// src/components/ProjectCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import Project3DPreview from './Project3DPreview'; // Your 3D text preview
import './ProjectCard.css';

function ProjectCard({ project }) {
  return (
    // The outer div is the card itself, no longer a Link wrapper
    <div className="project-card">
      <div className="project-image-container"> {/* Container for the 3D text preview */}
        <Project3DPreview
          title={project.title}
        />
      </div>
      <div className="project-info">
        {/* Displaying the title as 2D text on the card as well */}
        <h3 className="project-title-card">{project.title}</h3>
        <p className="project-short-description">{project.shortDescription}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-small"
              // onClick={(e) => e.stopPropagation()} // No longer strictly needed here
            >
              Live Demo
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-small btn-outline"
              // onClick={(e) => e.stopPropagation()} // No longer strictly needed here
            >
              View Code
            </a>
          )}
          {/* --- ADD BACK THE "View Details" LINK STYLED AS A BUTTON --- */}
          <Link to={`/projects/${project.id}`} className="btn btn-small btn-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;