import React, { useState } from 'react';
import { FaUser, FaFileContract, FaBell, FaCog, FaDownload } from 'react-icons/fa';
import './CustomerPortal.css';

function CustomerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Mock customer data
  const customerData = {
    name: 'John Doe',
    company: 'Tech Solutions Inc.',
    email: 'john@techsolutions.com',
    memberSince: '2023',
    contracts: [
      {
        id: 'CT-001',
        title: 'Enterprise Software Development',
        status: 'Active',
        startDate: '2024-01-15',
        endDate: '2024-12-15',
        value: '$25,000',
        progress: 75
      },
      {
        id: 'CT-002',
        title: 'Network Infrastructure Setup',
        status: 'Completed',
        startDate: '2023-06-01',
        endDate: '2023-11-30',
        value: '$15,000',
        progress: 100
      }
    ],
    notifications: [
      { id: 1, message: 'Project milestone completed', date: '2024-08-05', type: 'success' },
      { id: 2, message: 'Monthly report available', date: '2024-08-01', type: 'info' },
      { id: 3, message: 'Payment reminder', date: '2024-07-28', type: 'warning' }
    ]
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login - in real app, this would authenticate with backend
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <section className="customer-portal">
        <div className="portal-container">
          <div className="login-form-container">
            <h2>Customer Portal Login</h2>
            <p>Access your projects, contracts, and account information</p>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="login-btn">Access Portal</button>
            </form>
            
            <div className="login-help">
              <p>Don't have an account? <a href="#contact">Contact us</a> to get started.</p>
              <p><a href="#forgot">Forgot your password?</a></p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="customer-portal">
      <div className="portal-container">
        <div className="portal-header">
          <h2>Welcome back, {customerData.name}</h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="portal-nav">
          <button 
            className={activeTab === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaUser /> Dashboard
          </button>
          <button 
            className={activeTab === 'contracts' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('contracts')}
          >
            <FaFileContract /> Contracts
          </button>
          <button 
            className={activeTab === 'notifications' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell /> Notifications
          </button>
          <button 
            className={activeTab === 'settings' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Settings
          </button>
        </div>

        <div className="portal-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Active Contracts</h3>
                  <div className="stat-number">1</div>
                </div>
                <div className="stat-card">
                  <h3>Total Projects</h3>
                  <div className="stat-number">2</div>
                </div>
                <div className="stat-card">
                  <h3>Member Since</h3>
                  <div className="stat-number">{customerData.memberSince}</div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {customerData.notifications.slice(0, 3).map(notification => (
                    <div key={notification.id} className={`activity-item ${notification.type}`}>
                      <div className="activity-message">{notification.message}</div>
                      <div className="activity-date">{notification.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="contracts-content">
              <h3>Your Contracts</h3>
              <div className="contracts-list">
                {customerData.contracts.map(contract => (
                  <div key={contract.id} className="contract-card">
                    <div className="contract-header">
                      <h4>{contract.title}</h4>
                      <span className={`status ${contract.status.toLowerCase()}`}>
                        {contract.status}
                      </span>
                    </div>
                    <div className="contract-details">
                      <p><strong>Contract ID:</strong> {contract.id}</p>
                      <p><strong>Duration:</strong> {contract.startDate} to {contract.endDate}</p>
                      <p><strong>Value:</strong> {contract.value}</p>
                      <div className="progress-bar">
                        <div className="progress-label">Progress: {contract.progress}%</div>
                        <div className="progress-track">
                          <div 
                            className="progress-fill" 
                            style={{width: `${contract.progress}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="contract-actions">
                      <button className="btn-secondary">
                        <FaDownload /> Download Contract
                      </button>
                      <button className="btn-primary">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications-content">
              <h3>Notifications</h3>
              <div className="notifications-list">
                {customerData.notifications.map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.type}`}>
                    <div className="notification-content">
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-date">{notification.date}</div>
                    </div>
                    <button className="notification-dismiss">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-content">
              <h3>Account Settings</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={customerData.name} readOnly />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" value={customerData.company} readOnly />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={customerData.email} readOnly />
                </div>
                <div className="form-group">
                  <label>Newsletter Subscription</label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    Receive monthly newsletters and updates
                  </label>
                </div>
                <button className="btn-primary">Update Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CustomerPortal;
