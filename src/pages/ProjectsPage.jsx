// src/pages/ProjectsPage.jsx
import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../projectData'; // Import your project data
import './ProjectsPage.css'; // We'll create this

function ProjectsPage() {
  return (
    <div>
      <h2>My Projects</h2>
      <p>Here are some of the projects I've worked on.</p>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;