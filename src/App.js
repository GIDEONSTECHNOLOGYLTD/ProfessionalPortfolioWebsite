import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import AnimatedSkills from './components/AnimatedSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import DownloadCV from './components/DownloadCV';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <AnimatedSkills />
      <Experience />
      <Projects />
      <DownloadCV />
      <Contact />
    </div>
  );
}

export default App;
