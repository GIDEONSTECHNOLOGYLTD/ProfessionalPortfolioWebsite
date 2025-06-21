import React from 'react';
import './Hero.css';
import avatar from '../avatar.png'; // Placeholder for your photo or avatar

function Hero() {
  return (
    <section className="hero">
      <img src={avatar} alt="Gideon Aina" className="hero-avatar" />
      <div className="hero-content">
        <h1>Gideon Aina</h1>
        <h2>Innovative Software/Hardware Engineer</h2>
        <p>Owner & Lead Engineer, GideonsTechnology Ltd</p>
        <p>Specialized in mobile phone and computer software/hardware repair. Passionate about building modern, scalable solutions.</p>
        <a href="/Gideon_Aina_CV.pdf" className="cv-button" download>Download CV (PDF)</a>
      </div>
    </section>
  );
}

export default Hero;
