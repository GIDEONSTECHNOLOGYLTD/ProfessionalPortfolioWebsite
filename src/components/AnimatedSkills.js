import React from 'react';
import './AnimatedSkills.css';
import { FaRobot, FaUsers, FaCogs, FaComments, FaChartBar, FaLaptopCode, FaNetworkWired, FaServer, FaShieldAlt, FaCloudUploadAlt, FaProjectDiagram, FaHandshake, FaChartLine, FaBriefcase, FaGlobe } from 'react-icons/fa';

const skills = [
  { name: 'Enterprise Software Solutions', level: 95, icon: <FaLaptopCode /> },
  { name: 'Cloud Infrastructure Management', level: 90, icon: <FaCloudUploadAlt /> },
  { name: 'Network Security Architecture', level: 92, icon: <FaShieldAlt /> },
  { name: 'Business Process Automation', level: 88, icon: <FaCogs /> },
  { name: 'Strategic IT Consulting', level: 95, icon: <FaBriefcase /> },
  { name: 'Executive Leadership', level: 93, icon: <FaUsers /> },
  { name: 'Server & Data Center Management', level: 90, icon: <FaServer /> },
  { name: 'Enterprise Network Design', level: 94, icon: <FaNetworkWired /> },
  { name: 'Custom Software Development', level: 92, icon: <FaLaptopCode /> },
  { name: 'Client Relationship Management', level: 90, icon: <FaHandshake /> },
  { name: 'Project Portfolio Management', level: 88, icon: <FaProjectDiagram /> },
  { name: 'Business Strategy', level: 94, icon: <FaChartLine /> },
  { name: 'Team Leadership & Growth', level: 92, icon: <FaUsers /> },
  { name: 'Enterprise Solution Architecture', level: 95, icon: <FaProjectDiagram /> },
  { name: 'International Business Development', level: 85, icon: <FaGlobe /> },
  { name: 'Client Satisfaction Management', level: 96, icon: <FaHandshake /> },
  { name: 'Corporate Communications', level: 90, icon: <FaComments /> },
];

const aiSkills = [
  { name: 'Enterprise AI Strategy & Implementation', level: 92, icon: <FaRobot /> },
  { name: 'Business Intelligence & Analytics Solutions', level: 94, icon: <FaChartBar /> },
  { name: 'AI-Powered Customer Experience Platforms', level: 90, icon: <FaRobot /> },
  { name: 'Predictive Maintenance Systems', level: 88, icon: <FaCogs /> },
  { name: 'Natural Language Processing for Enterprise', level: 86, icon: <FaRobot /> },
  { name: 'Computer Vision & Image Recognition Solutions', level: 85, icon: <FaRobot /> },
  { name: 'Machine Learning Operations (MLOps)', level: 89, icon: <FaRobot /> },
  { name: 'AI Risk Management & Governance', level: 91, icon: <FaShieldAlt /> },
];

function SkillBar({ skill }) {
  return (
    <div className="skill-bar">
      <span className="skill-icon">{skill.icon}</span>
      <span className="skill-name">{skill.name}</span>
      <div className="bar-bg">
        <div className="bar-fill" style={{ width: skill.level + '%' }}></div>
      </div>
      <span className="skill-level">{skill.level}%</span>
    </div>
  );
}

function AnimatedSkills() {
  const [tab, setTab] = React.useState('core');

  return (
    <section className="animated-skills">
      <h2>Our Services & Expertise</h2>
      <div className="skills-intro">
        GideonsTechnology Ltd offers a comprehensive range of enterprise technology solutions and services. Explore our expertise areas below.
      </div>
      <div className="skills-tabs">
        <button className={tab==='core' ? 'active' : ''} onClick={()=>setTab('core')}>Enterprise Solutions</button>
        <button className={tab==='ai' ? 'active' : ''} onClick={()=>setTab('ai')}>AI & Advanced Analytics</button>
      </div>
      <div className="skills-grid">
        {(tab==='core' ? skills : aiSkills).map((skill, idx) => <SkillBar skill={skill} key={idx} />)}
      </div>
    </section>
  );
}

export default AnimatedSkills;
