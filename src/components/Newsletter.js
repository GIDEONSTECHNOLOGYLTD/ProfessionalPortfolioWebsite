import React, { useState } from 'react';
import { FaEnvelope, FaCheck, FaNewspaper, FaTrendingUp, FaUsers } from 'react-icons/fa';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call - replace with actual newsletter service
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-header">
            <FaNewspaper className="newsletter-icon" />
            <h2>Stay Updated with GideonsTechnology</h2>
            <p>Get the latest insights on technology trends, project updates, and exclusive offers delivered to your inbox monthly.</p>
          </div>

          <div className="newsletter-benefits">
            <div className="benefit-item">
              <FaTrendingUp className="benefit-icon" />
              <h3>Tech Insights</h3>
              <p>Latest technology trends and industry analysis</p>
            </div>
            <div className="benefit-item">
              <FaUsers className="benefit-icon" />
              <h3>Case Studies</h3>
              <p>Real client success stories and project highlights</p>
            </div>
            <div className="benefit-item">
              <FaEnvelope className="benefit-icon" />
              <h3>Exclusive Offers</h3>
              <p>Special discounts and early access to new services</p>
            </div>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button 
                  type="submit" 
                  className="newsletter-btn"
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </div>
              <p className="newsletter-disclaimer">
                We respect your privacy. Unsubscribe at any time. No spam, ever.
              </p>
            </form>
          ) : (
            <div className="subscription-success">
              <FaCheck className="success-icon" />
              <h3>Successfully Subscribed!</h3>
              <p>Thank you for joining our newsletter. You'll receive our next update soon.</p>
            </div>
          )}

          <div className="newsletter-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Subscribers</div>
            </div>
            <div className="stat">
              <div className="stat-number">12</div>
              <div className="stat-label">Monthly Issues</div>
            </div>
            <div className="stat">
              <div className="stat-number">95%</div>
              <div className="stat-label">Open Rate</div>
            </div>
          </div>
        </div>

        <div className="newsletter-preview">
          <h3>Latest Newsletter Preview</h3>
          <div className="preview-card">
            <div className="preview-header">
              <h4>GideonsTechnology Monthly - August 2024</h4>
              <span className="preview-date">Published: Aug 1, 2024</span>
            </div>
            <div className="preview-content">
              <div className="preview-section">
                <h5>🚀 This Month's Highlights</h5>
                <ul>
                  <li>New AI-powered network monitoring tools</li>
                  <li>Client spotlight: Tech Solutions Inc.</li>
                  <li>Upcoming cybersecurity workshop</li>
                </ul>
              </div>
              <div className="preview-section">
                <h5>📈 Industry Insights</h5>
                <p>The rise of edge computing in enterprise networks...</p>
              </div>
              <div className="preview-section">
                <h5>💡 Tech Tips</h5>
                <p>5 ways to optimize your cloud infrastructure costs...</p>
              </div>
            </div>
            <div className="preview-footer">
              <button className="preview-btn">Read Full Newsletter</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
