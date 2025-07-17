import React, { useState, useEffect, useRef } from 'react';
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
  const heroRef = useRef(null);
  const avatarRef = useRef(null);
  
  // Typing effect for headline
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
  
  // Create animated particles
  useEffect(() => {
    if (!heroRef.current) return;
    
    const container = heroRef.current;
    const particlesCount = 8;
    const particles = [];
    
    // Remove any existing particles
    const existingParticles = container.querySelectorAll('.particle');
    existingParticles.forEach(p => p.remove());
    
    // Create new particles
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random positioning and size
      const size = Math.random() * 60 + 20; // 20-80px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = 0;
      
      // Random animation duration and delay
      const duration = Math.random() * 10 + 10; // 10-20s
      const delay = Math.random() * 5;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    // Cleanup
    return () => {
      particles.forEach(p => p && p.remove());
    };
  }, []);
  
  // 3D tilt effect for avatar
  useEffect(() => {
    if (!avatarRef.current) return;
    
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      
      const avatar = avatarRef.current;
      const rect = avatar.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      avatar.style.transform = `perspective(1000px) rotateX(${deltaY * -10}deg) rotateY(${deltaX * 10}deg) scale3d(1.05, 1.05, 1.05)`;
    };
    
    const handleMouseLeave = () => {
      avatarRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    const parent = avatarRef.current.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="hero revamp-hero-bg">
      {/* Particles container */}
      <div className="particles-container"></div>
      
      <div className="hero-avatar-frame">
        <img ref={avatarRef} src={avatar} alt="Gideon Aina" className="hero-avatar" />
        <div className="avatar-glow"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-name">Gideon Aina</h1>
        <div className="hero-badge">Owner & Lead Engineer at GideonsTechnology</div>
        <h2 className="hero-animated-headline">
          <span>{typed}</span>
          <span className="hero-cursor">|</span>
        </h2>
        <p className="hero-intro">Hi, I'm Gideon — a passionate engineer blending software, network, and decision support skills to solve real-world problems. Welcome to my portfolio!</p>
        <div className="hero-buttons">
          <a href="/Gideon_Aina_CV.pdf" className="cv-button big-cv-btn" download>
            <span className="btn-text">Download CV</span>
            <span className="btn-icon">📄</span>
          </a>
          <a href="#contact" className="hero-contact-btn">Get in touch</a>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="scroll-icon"></div>
        <p>Scroll to explore</p>
      </div>
    </section>
  );
}

export default Hero;
