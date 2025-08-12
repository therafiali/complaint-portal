# 🚀 Quick Setup Guide

## Prerequisites

1. **Backend Running**: Make sure your backend is running on `http://localhost:5000`
2. **Frontend Dependencies**: All dependencies are already installed

## 🏃‍♂️ Quick Start

### 1. Start the Frontend

```bash
cd frontend
npm start
```

### 2. Open Your Browser

Navigate to `http://localhost:3000`

### 3. Test the Authentication

#### Register a New User

1. Click "📝 Register" in the navigation
2. Fill out the registration form
3. Submit the form
4. You'll be redirected to the login page

#### Login

1. Click "🔐 Login" in the navigation
2. Enter your email and password
3. Submit the form
4. You'll be redirected to the home page
5. You should see "👤 Welcome, [username]!" in the header

#### Access Protected Routes

After logging in, you'll see:

- 📋 Complaints (protected route)
- ➕ New Complaint (protected route)

#### Reset Password

1. Click "🔐 Login"
2. Click "Forgot your password?"
3. Enter your email and new password
4. Submit the form

#### Logout

1. Click the "🚪 Logout" button in the header
2. You'll be redirected to the login page

## 🔧 Configuration

### Backend URL

If your backend runs on a different port, update `src/hooks/useAuth.js`:

```javascript
const API_BASE_URL = "http://localhost:YOUR_PORT/api/auth";
```

### CORS Issues

If you get CORS errors, ensure your backend has CORS enabled:

```javascript
// In your backend app.js
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

## 📁 File Structure

```
frontend/
├── src/
│   ├── hooks/
│   │   ├── useAuth.js          # Authentication hooks
│   │   └── useComplaints.js    # Complaint hooks
│   ├── pages/
│   │   ├── HomePage.js         # Home page
│   │   ├── LoginPage.js        # Login form
│   │   ├── RegisterPage.js     # Registration form
│   │   ├── ResetPasswordPage.js # Password reset
│   │   ├── ComplaintsPage.js   # Complaints list
│   │   └── NewComplaintPage.js # New complaint form
│   ├── App.js                  # Main layout
│   ├── router.js               # Route definitions
│   └── index.js                # App entry point
├── AUTHENTICATION_GUIDE.md     # Detailed auth guide
├── API_DOCUMENTATION.md        # API docs
├── ROUTING_GUIDE.md           # Routing guide
└── SETUP_GUIDE.md             # This file
```

## 🎯 Features

### ✅ What's Working

- User registration
- User login/logout
- Password reset
- Protected routes
- JWT token management
- User data caching
- Error handling
- Loading states
- Form validation

### 🔒 Security Features

- JWT token authentication
- Password hashing (backend)
- Protected route access
- Automatic token storage/removal
- Secure API communication

### 🎨 UI Features

- Responsive design
- Loading indicators
- Error messages
- Success messages
- Form validation
- Navigation between pages

## 🐛 Troubleshooting

### Common Issues

1. **"Backend not running"**

   - Start your backend server first
   - Check if it's running on port 5000

2. **"CORS errors"**

   - Add CORS middleware to your backend
   - Check the API base URL in `useAuth.js`

3. **"Token not working"**

   - Check browser localStorage
   - Verify login response format

4. **"Protected routes not showing"**
   - Make sure you're logged in
   - Check if token exists in localStorage

### Debug Commands

Open browser console and run:

```javascript
// Check authentication status
console.log(localStorage.getItem("authToken"));

// Check if authenticated
console.log(!!localStorage.getItem("authToken"));
```

## 📚 Documentation

- **AUTHENTICATION_GUIDE.md**: Complete authentication documentation
- **API_DOCUMENTATION.md**: Backend API documentation
- **ROUTING_GUIDE.md**: TanStack Router guide

## 🎉 Success!

Your complaint portal now has a complete authentication system that integrates seamlessly with your existing backend! No backend changes required.

**Next Steps:**

1. Test all authentication flows
2. Customize the UI styling
3. Add more protected features
4. Implement complaint management with user association

Happy coding! 🚀
