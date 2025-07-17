import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import AnimatedSkills from './components/AnimatedSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import DownloadCV from './components/DownloadCV';
import Contact from './components/Contact';
import NetworkOpsDashboard from './components/NetworkOpsDashboard';
import SkillHighlights from './components/SkillHighlights';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <section id="home"><Hero /></section>
      <section id="skills"><AnimatedSkills /></section>
      <section id="experience"><Experience /></section>
      <section id="projects"><Projects /></section>
      <section id="skillhighlights"><SkillHighlights /></section>
      <section id="dashboard"><NetworkOpsDashboard /></section>
      <section id="downloadcv"><DownloadCV /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}

export default App;
