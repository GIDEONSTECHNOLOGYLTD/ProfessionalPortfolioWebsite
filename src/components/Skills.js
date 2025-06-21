import React from 'react';

const skills = [
  'Computer Maintenance',
  'Software as a Service (SaaS)',
  'Mobile Telephony',
  'Equipment Repair',
  'Software Installation',
  'Leadership',
  'Computer Hardware',
  'Safety Practices',
  'Software Troubleshooting',
  'Account Management',
  'Attention to Detail',
  'Problem Solving',
  'Teamwork',
  'Functionality',
  'Power Tools',
  'Customer Service',
  'Communication',
];

function Skills() {
  const aiSkills = [
    'AI-powered chatbots and virtual assistants',
    'Automated data analysis and reporting',
    'AI-driven customer support solutions',
    'Machine learning integration for business processes',
    'Natural language processing (NLP) tools',
    'AI-based diagnostics for hardware/software issues',
  ];
  return (
    <section className="skills">
      <h2>Skills</h2>
      <ul>
        {skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>
      <h3 style={{marginTop: '2em', color: '#1761c7'}}>AI & Automation Skills</h3>
      <ul>
        {aiSkills.map((aiSkill, idx) => (
          <li key={idx}>{aiSkill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
