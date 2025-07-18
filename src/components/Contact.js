import React, { useState } from 'react';
import { FaLinkedin, FaGlobe, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Formspree endpoint for ceo@gideonstechnology.com (replace with your Formspree endpoint if you register)
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrgwrpbv'; // User's real Formspree endpoint

  const handleSubmit = async e => {
    e.preventDefault();
    // Send form data to Formspree
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });
    if (response.ok) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } else {
      alert('There was a problem sending your message. Please try again.');
    }
  };

  return (
    <section className="contact-section">
      <h2>Contact Me</h2>
      <div className="contact-icons">
        <a href="https://linkedin.com/in/gideon-aina-285a5b119" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin /></a>
        <a href="https://gideonstechnology.com/" target="_blank" rel="noopener noreferrer" title="Website"><FaGlobe /></a>
        <a href="mailto:ceo@gideonstechnology.com" title="CEO Email"><FaEnvelope /></a>
        <a href="mailto:support@gideonstechnology.com" title="Support Email"><FaEnvelope style={{color: '#188038'}}/></a>
        <a href="mailto:oainagideon@gmail.com" title="Personal Email"><FaEnvelope style={{color: '#fbbc05'}}/></a>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
        <button type="submit">Send Message</button>
        {submitted && <div className="form-success">Thank you! Your message has been received.</div>}
      </form>
      <div style={{marginTop: '18px', color: '#666', fontSize: '0.97em'}}>
        For direct support, email <a href="mailto:support@gideonstechnology.com">support@gideonstechnology.com</a> or <a href="mailto:oainagideon@gmail.com">oainagideon@gmail.com</a>.
      </div>
    </section>
  );
}

export default Contact;
