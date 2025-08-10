import React from 'react';
import { FaCode, FaNetworkWired, FaCloud, FaMobile, FaDatabase, FaShieldAlt } from 'react-icons/fa';
import './Services.css';

const services = [
  {
    icon: <FaCode />,
    title: 'Enterprise Software Development',
    description: 'Custom software solutions tailored to your business needs with modern technologies.',
    features: ['Web Applications', 'Desktop Software', 'API Development', 'System Integration'],
    pricing: 'Starting from $5,000'
  },
  {
    icon: <FaNetworkWired />,
    title: 'Network Infrastructure',
    description: 'Complete network setup, monitoring, and maintenance for businesses.',
    features: ['Network Design', 'Security Implementation', 'Performance Monitoring', '24/7 Support'],
    pricing: 'Starting from $2,500'
  },
  {
    icon: <FaCloud />,
    title: 'Cloud Solutions',
    description: 'Migrate and manage your business operations in the cloud securely.',
    features: ['Cloud Migration', 'AWS/Azure Setup', 'Data Backup', 'Scalability Planning'],
    pricing: 'Starting from $3,000'
  },
  {
    icon: <FaMobile />,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['iOS Development', 'Android Development', 'React Native', 'App Store Deployment'],
    pricing: 'Starting from $8,000'
  },
  {
    icon: <FaDatabase />,
    title: 'Database Management',
    description: 'Database design, optimization, and maintenance services.',
    features: ['Database Design', 'Performance Tuning', 'Data Migration', 'Backup Solutions'],
    pricing: 'Starting from $1,500'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Cybersecurity Services',
    description: 'Protect your business with comprehensive security solutions.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Training'],
    pricing: 'Starting from $2,000'
  }
];

function Services() {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <h2>Our Business Services</h2>
          <p>Comprehensive technology solutions for modern businesses</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              
              <div className="service-pricing">{service.pricing}</div>
              <button className="service-cta">Get Quote</button>
            </div>
          ))}
        </div>
        
        <div className="services-cta">
          <h3>Ready to Transform Your Business?</h3>
          <p>Contact us for a free consultation and custom quote</p>
          <a href="#contact" className="cta-button">Start Your Project</a>
        </div>
      </div>
    </section>
  );
}

export default Services;
