import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Services from './components/Services';
import AnimatedSkills from './components/AnimatedSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import SkillHighlights from './components/SkillHighlights';
import NetworkOpsDashboard from './components/NetworkOpsDashboard';
import CustomerPortal from './components/CustomerPortal';
import Newsletter from './components/Newsletter';
import DownloadCV from './components/DownloadCV';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <section id="home"><Hero /></section>
      <section id="services"><Services /></section>
      <section id="skills"><AnimatedSkills /></section>
      <section id="experience"><Experience /></section>
      <section id="projects"><Projects /></section>
      <section id="skillhighlights"><SkillHighlights /></section>
      <section id="dashboard"><NetworkOpsDashboard /></section>
      <section id="portal"><CustomerPortal /></section>
      <section id="newsletter"><Newsletter /></section>
      <section id="downloadcv"><DownloadCV /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}

export default App;
