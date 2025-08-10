# Frontend-Backend Integration Guide

This guide explains how to connect your React frontend to the MongoDB backend for full functionality.

## 🚀 Quick Setup

### 1. Backend Setup (MongoDB)

First, set up your MongoDB backend:

```bash
cd backend-mongodb
npm install
```

Create `.env` file from template:
```bash
cp .env.example .env
```

Configure your `.env` file:
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gideonstechnology

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Gmail Configuration for Email Services
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Company Information
COMPANY_NAME=GideonsTechnology Ltd
COMPANY_EMAIL=ceo@gideonstechnology.com
COMPANY_WEBSITE=https://gideonstechnology.com
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

In your main project directory, create `.env` file:
```bash
cp .env.example .env
```

Update your frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Install any missing dependencies:
```bash
npm install
```

Start the frontend:
```bash
npm start
```

## 🔧 What's Been Integrated

### ✅ Components Updated

1. **Newsletter Component** (`src/components/Newsletter.js`)
   - Now connects to `/api/newsletter/subscribe`
   - Sends confirmation emails automatically
   - Handles subscription errors gracefully

2. **Contact Form** (`src/components/Contact.js`)
   - Connects to `/api/contact` endpoint
   - Sends notifications to your Gmail
   - Auto-responds to customers

3. **Customer Portal** (`src/components/CustomerPortal.js`)
   - Full authentication with JWT tokens
   - Real contract management
   - Live notifications system
   - User profile management

### ✅ New API Service (`src/utils/api.js`)

Centralized API service with methods for:
- Authentication (login, register, logout)
- Newsletter management
- Contact form submissions
- Contract management
- Notifications
- User profiles

## 🔐 Authentication Flow

1. **User Registration/Login**: Frontend sends credentials to `/api/auth/login`
2. **JWT Token**: Backend returns JWT token stored in localStorage
3. **Authenticated Requests**: All API calls include `Authorization: Bearer <token>`
4. **Auto-Login**: Frontend checks for existing token on page load

## 📧 Email Integration

The backend automatically sends emails for:
- **Newsletter subscriptions**: Welcome email with unsubscribe link
- **Contact form**: Notification to you + auto-response to customer
- **User registration**: Welcome email to new customers

## 🗄️ Database Schema

Your MongoDB will have these collections:
- `users` - Customer accounts and profiles
- `contracts` - Project contracts and progress
- `notifications` - System notifications
- `newslettersubscribers` - Email subscribers
- `contactforms` - Contact form submissions

## 🚀 Deployment Options

### Option 1: Railway (Recommended)
```bash
# In backend-mongodb directory
npm install -g @railway/cli
railway login
railway init
railway add mongodb
railway deploy
```

### Option 2: Render
1. Connect your GitHub repo to Render
2. Create new Web Service
3. Set build command: `cd backend-mongodb && npm install`
4. Set start command: `cd backend-mongodb && npm start`
5. Add environment variables in Render dashboard

### Option 3: Heroku
```bash
# In backend-mongodb directory
heroku create your-app-name
heroku addons:create mongolab:sandbox
heroku config:set JWT_SECRET=your-secret
heroku config:set GMAIL_USER=your-email
heroku config:set GMAIL_APP_PASSWORD=your-password
git push heroku main
```

## 🔧 Environment Configuration

### Development
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: Local or MongoDB Atlas

### Production
Update frontend `.env`:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🧪 Testing the Integration

### 1. Test Newsletter Subscription
1. Go to Newsletter section
2. Enter email and subscribe
3. Check your Gmail for confirmation email

### 2. Test Contact Form
1. Fill out contact form
2. Check your Gmail for notification
3. Customer should receive auto-response

### 3. Test Customer Portal
1. Register new account
2. Login with credentials
3. View dashboard, contracts, notifications

## 🛠️ API Endpoints Available

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)

### Contracts
- `GET /api/contracts` - Get user contracts
- `GET /api/contracts/:id` - Get specific contract

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Backend includes CORS middleware
   - Ensure frontend URL is in CORS whitelist

2. **Authentication Errors**
   - Check JWT_SECRET in backend .env
   - Verify token is being sent in headers

3. **Email Not Sending**
   - Verify Gmail app password (not regular password)
   - Check Gmail 2FA is enabled
   - Ensure less secure apps is disabled

4. **MongoDB Connection**
   - Verify MongoDB URI format
   - Check network access in MongoDB Atlas
   - Ensure database user has correct permissions

### Debug Mode

Enable debug logging in backend:
```env
NODE_ENV=development
DEBUG=true
```

## 🎯 Next Steps

1. **Deploy Backend**: Choose Railway, Render, or Heroku
2. **Update Frontend**: Change API URL to production backend
3. **Test Production**: Verify all features work in production
4. **Monitor**: Set up logging and monitoring
5. **Scale**: Add more features as your business grows

## 💡 Additional Features to Consider

- **Payment Integration**: Add Stripe for contract payments
- **File Uploads**: AWS S3 for document storage
- **Real-time Updates**: WebSocket for live notifications
- **Admin Dashboard**: Manage customers and contracts
- **Analytics**: Track user engagement and conversions

Your website is now a fully functional business platform! 🎉
