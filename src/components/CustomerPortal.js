import React, { useState, useEffect } from 'react';
import { FaUser, FaFileContract, FaBell, FaCog, FaDownload } from 'react-icons/fa';
import apiService from '../utils/api';
import './CustomerPortal.css';

function CustomerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [user, setUser] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle notification dismissal
  const handleDismissNotification = async (notificationId) => {
    try {
      await apiService.deleteNotification(notificationId);
      setNotifications(notifications.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error('Error dismissing notification:', error);
      alert('Failed to dismiss notification. Please try again.');
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await apiService.login(loginForm);
      
      if (response.success) {
        setUser(response.user);
        setIsLoggedIn(true);
        setLoginForm({ email: '', password: '' });
        await loadUserData();
      } else {
        alert(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      setContracts([]);
      setNotifications([]);
      setActiveTab('dashboard');
    }
  };

  // Load user data after login
  const loadUserData = async () => {
    try {
      const [contractsRes, notificationsRes] = await Promise.all([
        apiService.getContracts(),
        apiService.getNotifications(1, 10)
      ]);
      
      if (contractsRes.success) {
        setContracts(contractsRes.data);
      }
      
      if (notificationsRes.success) {
        setNotifications(notificationsRes.data.notifications);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = apiService.getToken();
      if (token) {
        try {
          const response = await apiService.getCurrentUser();
          if (response.success) {
            setUser(response.user);
            setIsLoggedIn(true);
            await loadUserData();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          apiService.removeToken();
        }
      }
    };
    
    checkAuth();
  }, []);

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
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Access Portal'}
              </button>
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
          <h2>Welcome back, {user?.firstName || user?.email || 'User'}</h2>
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
                  <div className="stat-number">{contracts.filter(c => c.status === 'active').length}</div>
                </div>
                <div className="stat-card">
                  <h3>Total Contracts</h3>
                  <div className="stat-number">{contracts.length}</div>
                </div>
                <div className="stat-card">
                  <h3>Member Since</h3>
                  <div className="stat-number">{user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}</div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {notifications.slice(0, 3).map(notification => (
                    <div key={notification._id} className={`activity-item ${notification.type}`}>
                      <div className="activity-message">{notification.message}</div>
                      <div className="activity-date">{new Date(notification.createdAt).toLocaleDateString()}</div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div className="activity-item info">
                      <div className="activity-message">No recent activity</div>
                      <div className="activity-date">Welcome to your portal!</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="contracts-content">
              <h3>Your Contracts</h3>
              <div className="contracts-list">
                {contracts.map(contract => (
                  <div key={contract._id} className="contract-card">
                    <div className="contract-header">
                      <h4>{contract.title}</h4>
                      <span className={`status ${contract.status.toLowerCase()}`}>
                        {contract.status}
                      </span>
                    </div>
                    <div className="contract-details">
                      <p><strong>Contract ID:</strong> {contract.contractId}</p>
                      <p><strong>Service:</strong> {contract.serviceType?.replace('_', ' ')}</p>
                      <p><strong>Value:</strong> ${contract.value?.toLocaleString() || 'TBD'}</p>
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
                {contracts.length === 0 && (
                  <div className="no-contracts">
                    <p>No contracts found. Contact us to get started with your first project!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications-content">
              <h3>Notifications</h3>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div key={notification._id} className={`notification-item ${notification.type}`}>
                    <div className="notification-content">
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-date">{new Date(notification.createdAt).toLocaleDateString()}</div>
                    </div>
                    <button 
                      className="notification-dismiss"
                      onClick={() => handleDismissNotification(notification._id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <p>No notifications at this time.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-content">
              <h3>Account Settings</h3>
              <div className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Not provided'} readOnly />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" value={user?.company || 'Not provided'} readOnly />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user?.email || ''} readOnly />
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
