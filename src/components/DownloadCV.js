import React from 'react';

function DownloadCV() {
  return (
    <section className="download-cv">
      <h2>Download My CV</h2>
      <a href="/Gideon_Aina_CV.html" target="_blank" rel="noopener noreferrer" className="cv-button">View & Download CV (PDF)</a>
      <p style={{fontSize: '0.95em', color: '#666', marginTop: '8px'}}>Tip: Click the button above, then use your browser’s <b>Print → Save as PDF</b> for a professional download.</p>
    </section>
  );
}

export default DownloadCV;
