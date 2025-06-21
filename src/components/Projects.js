import React from 'react';

const projects = [
  {
    name: 'SecureTrack Dashboard',
    url: 'https://securetrack-dashboard.onrender.com',
    description:
      'A robust, secure, and modern dashboard application designed for real-time data tracking and analytics. Built with best practices in modern web development, featuring responsive design and a seamless user experience.'
  },
  {
    name: 'Modern Frontend',
    url: 'https://frontend-t73t.onrender.com',
    description:
      'A cutting-edge frontend project showcasing advanced UI/UX techniques, modern JavaScript frameworks, and a focus on speed, accessibility, and maintainability.'
  },
  // Add more projects here as needed
];

function Projects() {
  return (
    <section className="projects">
      <h2>Recent Projects</h2>
      <div className="project-list">
        {projects.map((project, idx) => (
          <div className="project" key={idx}>
            <h3><a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a></h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <p className="project-note">I am experienced in building modern, responsive, and scalable web applications tailored to client needs. If you have a project in mind, let’s connect!</p>
    </section>
  );
}

export default Projects;
