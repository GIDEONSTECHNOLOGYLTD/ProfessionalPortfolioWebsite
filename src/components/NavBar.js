import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Contact', href: '#contact' },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar${menuOpen ? ' open' : ''}`}> 
      <div className="navbar-logo">GA</div>
      <ul className="navbar-links">
        {navLinks.map(link => (
          <li key={link.href}>
            <a href={link.href} onClick={e => handleNavClick(e, link.href)}>{link.label}</a>
          </li>
        ))}
      </ul>
      <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={e => handleNavClick(e, link.href)}>{link.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
