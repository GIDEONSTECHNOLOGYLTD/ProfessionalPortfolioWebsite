import React from 'react';
import './AnimatedSkills.css';
import { FaRobot, FaTools, FaUsers, FaCogs, FaComments, FaChartBar } from 'react-icons/fa';

const skills = [
  { name: 'Computer Maintenance', level: 90, icon: <FaTools /> },
  { name: 'Software as a Service (SaaS)', level: 80, icon: <FaCogs /> },
  { name: 'Mobile Telephony', level: 85, icon: <FaChartBar /> },
  { name: 'Equipment Repair', level: 88, icon: <FaTools /> },
  { name: 'Software Installation', level: 87, icon: <FaCogs /> },
  { name: 'Leadership', level: 75, icon: <FaUsers /> },
  { name: 'Computer Hardware', level: 90, icon: <FaTools /> },
  { name: 'Safety Practices', level: 80, icon: <FaCogs /> },
  { name: 'Software Troubleshooting', level: 88, icon: <FaCogs /> },
  { name: 'Account Management', level: 70, icon: <FaUsers /> },
  { name: 'Attention to Detail', level: 85, icon: <FaUsers /> },
  { name: 'Problem Solving', level: 90, icon: <FaCogs /> },
  { name: 'Teamwork', level: 80, icon: <FaUsers /> },
  { name: 'Functionality', level: 80, icon: <FaCogs /> },
  { name: 'Power Tools', level: 75, icon: <FaTools /> },
  { name: 'Customer Service', level: 82, icon: <FaComments /> },
  { name: 'Communication', level: 85, icon: <FaComments /> },
];

const aiSkills = [
  { name: 'AI-powered chatbots and virtual assistants', level: 80, icon: <FaRobot /> },
  { name: 'Automated data analysis and reporting', level: 75, icon: <FaChartBar /> },
  { name: 'AI-driven customer support solutions', level: 80, icon: <FaRobot /> },
  { name: 'Machine learning integration for business processes', level: 70, icon: <FaCogs /> },
  { name: 'Natural language processing (NLP) tools', level: 75, icon: <FaRobot /> },
  { name: 'AI-based diagnostics for hardware/software issues', level: 78, icon: <FaRobot /> },
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
      <h2>Skills</h2>
      <div className="skills-intro">
        Explore my top technical skills. Switch between categories to see more!
      </div>
      <div className="skills-tabs">
        <button className={tab==='core' ? 'active' : ''} onClick={()=>setTab('core')}>Core Skills</button>
        <button className={tab==='ai' ? 'active' : ''} onClick={()=>setTab('ai')}>AI & Automation</button>
      </div>
      <div className="skills-grid">
        {(tab==='core' ? skills : aiSkills).map((skill, idx) => <SkillBar skill={skill} key={idx} />)}
      </div>
    </section>
  );
}

export default AnimatedSkills;
