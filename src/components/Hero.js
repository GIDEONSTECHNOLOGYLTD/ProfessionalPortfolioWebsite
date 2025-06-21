import React, { useState, useEffect } from 'react';
import './Hero.css';
import avatar from '../avatar.png';

const headlines = [
  'Software Engineer',
  'Network Specialist',
  'DSS Enthusiast',
  'Automation Expert',
  'Tech Innovator'
];

function Hero() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (typed.length < headlines[headlineIdx].length) {
        timeout = setTimeout(() => {
          setTyped(headlines[headlineIdx].slice(0, typed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      timeout = setTimeout(() => {
        setTyped('');
        setTyping(true);
        setHeadlineIdx((headlineIdx + 1) % headlines.length);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [typed, typing, headlineIdx]);

  return (
    <section className="hero revamp-hero-bg">
      <div className="hero-avatar-frame">
        <img src={avatar} alt="Gideon Aina" className="hero-avatar" />
      </div>
      <div className="hero-content">
        <h1 className="hero-name">Gideon Aina</h1>
        <h2 className="hero-animated-headline">
          <span>{typed}</span>
          <span className="hero-cursor">|</span>
        </h2>
        <p className="hero-intro">Hi, I’m Gideon — a passionate engineer blending software, network, and decision support skills to solve real-world problems. Welcome to my portfolio!</p>
        <a href="/Gideon_Aina_CV.pdf" className="cv-button big-cv-btn" download>Download CV (PDF)</a>
      </div>
      <svg className="hero-wave" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#e0e7ff" fillOpacity="1" d="M0,64L80,58.7C160,53,320,43,480,53.3C640,64,800,96,960,90.7C1120,85,1280,43,1360,21.3L1440,0V100H1360C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100H0V64Z"></path></svg>
    </section>
  );
}

export default Hero;
