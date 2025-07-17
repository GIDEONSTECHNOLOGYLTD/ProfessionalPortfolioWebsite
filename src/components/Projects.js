import React, { useState } from 'react';
import './Projects.css';

const projects = [
  {
    name: 'SecureTrack Dashboard',
    url: 'https://securetrack-dashboard.onrender.com',
    type: 'Project',
    year: '2023',
    category: 'Security & Analytics',
    description:
      'A robust, secure, and modern dashboard application designed for real-time data tracking and analytics. Built with best practices in modern web development, featuring responsive design and a seamless user experience.'
  },
  {
    name: 'Modern Frontend',
    url: 'https://frontend-t73t.onrender.com',
    type: 'Showcase',
    year: '2022',
    category: 'UI/UX Design',
    description:
      'A cutting-edge frontend project showcasing advanced UI/UX techniques, modern JavaScript frameworks, and a focus on speed, accessibility, and maintainability.'
  },
  {
    name: 'Enterprise Resource Planning Solution',
    type: 'Case Study',
    year: '2023',
    category: 'Financial Technology',
    description:
      'Custom ERP solution designed for medium-sized financial institutions. Features include secure transaction processing, reporting dashboards, and integrated compliance modules tailored to West African banking regulations.'
  },
  {
    name: 'Network Infrastructure Upgrade',
    type: 'Service',
    year: '2022',
    category: 'IT Infrastructure',
    description:
      'Complete network infrastructure design and implementation for business facilities. Solution included secure VPN setup, enterprise-grade routing and switching, and comprehensive network monitoring systems.'
  }
];

function Projects() {
  const [activeModal, setActiveModal] = useState(null);

  // Handler for case study request button
  const handleCaseStudyRequest = (projectName) => {
    setActiveModal(projectName);
    // Smooth scroll to contact form
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    
    // Optionally, populate a hidden field or set some state that the contact form can use
    if (window.localStorage) {
      window.localStorage.setItem('requestedProject', projectName);
    }
  };

  // Close the modal
  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <section className="projects" id="projects">
      <h2>Enterprise Solutions Portfolio</h2>
      <p className="portfolio-intro">At GideonsTechnology Ltd, we deliver technology solutions that drive business growth. Below are selected projects from our portfolio.</p>
      
      <div className="project-list">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <div className="project-header">
              <span className="project-category">{project.category}</span>
              <span className="project-year">{project.year}</span>
            </div>
            {project.url ? (
              <h3 className="project-title">
                <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
              </h3>
            ) : (
              <h3 className="project-title">{project.name}</h3>
            )}
            <div className="project-type">{project.type}</div>
            <p className="project-description">{project.description}</p>
            <div className="project-footer">
              {project.url ? (
                <div className="project-actions">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="view-project-btn">View Project</a>
                  <button 
                    className="project-cta" 
                    onClick={() => handleCaseStudyRequest(project.name)}
                  >
                    Request Details
                  </button>
                </div>
              ) : (
                <button 
                  className="project-cta" 
                  onClick={() => handleCaseStudyRequest(project.name)}
                >
                  Request Case Study
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h3>Request Information About {activeModal}</h3>
            <p>Please use the contact form below to request additional information about this project.</p>
          </div>
        </div>
      )}
      
      <div className="projects-cta">
        <h3>Need technology solutions for your business?</h3>
        <p>GideonsTechnology Ltd is a Nigerian tech company operating in Ghana. We provide software development and network infrastructure services to businesses throughout West Africa. Contact us to discuss how we can help with your technology needs.</p>
        <a href="#contact" className="contact-btn">Get in Touch</a>
      </div>
    </section>
  );
}

export default Projects;
