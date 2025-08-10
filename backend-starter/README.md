# GideonsTechnology Backend API

Complete backend solution for the GideonsTechnology business website with customer portal, contract management, and newsletter system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone and setup
cd backend-starter
npm install

# Environment setup
cp .env.example .env
# Edit .env with your configuration

# Database setup
npx prisma migrate dev
npx prisma generate
npm run seed

# Start development server
npm run dev
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/account` - Delete user account

### Contracts
- `GET /api/contracts` - Get user contracts
- `GET /api/contracts/:id` - Get specific contract
- `POST /api/contracts` - Create new contract (admin)
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract

### Projects
- `GET /api/projects` - Get user projects
- `GET /api/projects/:id` - Get specific project
- `PUT /api/projects/:id/progress` - Update project progress

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `DELETE /api/notifications/:id` - Delete notification

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/subscribers` - Get subscribers (admin)

### Contact & Services
- `POST /api/contact` - Submit contact form
- `POST /api/services/request` - Request service quote
- `GET /api/services/requests` - Get service requests (admin)

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Required
DATABASE_URL=postgresql://user:pass@localhost:5432/gideonstech
JWT_SECRET=your-secret-key
SENDGRID_API_KEY=your-sendgrid-key

# Optional
STRIPE_SECRET_KEY=your-stripe-key
AWS_ACCESS_KEY_ID=your-aws-key
```

## 📊 Database Schema

The database includes tables for:
- Users (customers and admins)
- Contracts with progress tracking
- Projects and tasks
- Notifications system
- Newsletter subscribers
- Contact forms and service requests
- Payment tracking
- Audit logs

## 🔒 Security Features

- JWT authentication with role-based access
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- Input validation with Joi
- CORS protection
- Helmet security headers
- SQL injection prevention with Prisma

## 🚀 Deployment

### Option 1: Heroku
```bash
# Install Heroku CLI
heroku create gideonstechnology-api
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Option 2: DigitalOcean App Platform
```bash
# Create app.yaml
doctl apps create --spec app.yaml
```

### Option 3: AWS EC2
```bash
# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name gideonstech-api
pm2 startup
pm2 save
```

## 📈 Monitoring & Analytics

- Request logging with Morgan
- Error tracking and reporting
- Performance monitoring
- Database query optimization
- API usage analytics

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test auth.test.js
```

## 📞 Support

For technical support or questions:
- Email: ceo@gideonstechnology.com
- Documentation: [API Docs](https://api.gideonstechnology.com/docs)
- Issues: [GitHub Issues](https://github.com/GIDEONSTECHNOLOGYLTD/backend/issues)

## 🔄 Frontend Integration

Update your React frontend to use the backend:

```javascript
// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Authentication
const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Get user contracts
const getContracts = async (token) => {
  const response = await fetch(`${API_BASE_URL}/contracts`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

## 📋 Next Steps

1. **Set up your database** (PostgreSQL recommended)
2. **Configure environment variables**
3. **Run database migrations**
4. **Start the development server**
5. **Test API endpoints**
6. **Integrate with your frontend**
7. **Deploy to production**

Your backend will provide all the functionality needed for a complete business website with customer management, contract tracking, and automated communications.
