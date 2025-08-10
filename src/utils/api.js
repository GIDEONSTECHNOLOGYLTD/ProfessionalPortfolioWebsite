// API configuration and utilities
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API utility class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Set auth token
  setToken(token) {
    localStorage.setItem('token', token);
  }

  // Remove auth token
  removeToken() {
    localStorage.removeItem('token');
  }

  // Make authenticated request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.success && data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.removeToken();
    }
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Newsletter methods
  async subscribeNewsletter(email, name = '') {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  }

  async unsubscribeNewsletter(email) {
    return this.request('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Contact methods
  async submitContactForm(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Contract methods
  async getContracts() {
    return this.request('/contracts');
  }

  async getContract(id) {
    return this.request(`/contracts/${id}`);
  }

  // Notification methods
  async getNotifications(page = 1, limit = 20) {
    return this.request(`/notifications?page=${page}&limit=${limit}`);
  }

  async markNotificationRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async deleteNotification(id) {
    return this.request(`/notifications/${id}`, {
      method: 'DELETE',
    });
  }

  // User profile methods
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
