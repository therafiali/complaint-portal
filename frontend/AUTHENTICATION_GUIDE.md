# 🔐 Authentication System - Complete Guide

## Overview

This complaint portal now includes a complete authentication system that integrates with your existing backend. Users can register, login, reset passwords, and access protected routes.

## 🏗️ Architecture

### Backend Integration

- **Base URL**: `http://localhost:5000/api/auth`
- **Routes**: Register, Login, Reset Password, Get User
- **Authentication**: JWT tokens stored in localStorage

### Frontend Structure

```
src/
├── hooks/
│   └── useAuth.js          # Authentication hooks
├── pages/
│   ├── LoginPage.js        # Login form
│   ├── RegisterPage.js     # Registration form
│   └── ResetPasswordPage.js # Password reset form
└── App.js                  # Main layout with auth navigation
```

## 🔧 API Endpoints

### 1. Register User

- **URL**: `POST /api/auth/register`
- **Body**: `{ username, email, password }`
- **Response**: `{ message: "User registered successfully" }`

### 2. Login User

- **URL**: `POST /api/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ token: "jwt_token_here" }`

### 3. Reset Password

- **URL**: `POST /api/auth/reset`
- **Body**: `{ email, newpassword }`
- **Response**: `{ message: "new Password updated" }`

### 4. Get Current User

- **URL**: `GET /api/auth/user`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ username, email }`

## 🎣 React Query Hooks

### useRegister()

```javascript
import { useRegister } from "../hooks/useAuth";

const register = useRegister();

// Usage
register.mutate({ username, email, password });
```

### useLogin()

```javascript
import { useLogin } from "../hooks/useAuth";

const login = useLogin();

// Usage
login.mutate({ email, password });
```

### useResetPassword()

```javascript
import { useResetPassword } from "../hooks/useAuth";

const resetPassword = useResetPassword();

// Usage
resetPassword.mutate({ email, newpassword });
```

### useCurrentUser()

```javascript
import { useCurrentUser } from "../hooks/useAuth";

const { data: user, isLoading, error } = useCurrentUser();
```

## 🛣️ Routes

### Public Routes

- `/` - Home page
- `/login` - Login form
- `/register` - Registration form
- `/reset-password` - Password reset form

### Protected Routes (require authentication)

- `/complaints` - Complaints list
- `/complaints/new` - Create new complaint

## 🔒 Authentication Flow

### 1. Registration Flow

1. User fills registration form
2. Form validates input (passwords match, required fields)
3. `useRegister` hook sends data to backend
4. On success: Redirect to login page
5. On error: Display error message

### 2. Login Flow

1. User fills login form
2. `useLogin` hook sends credentials to backend
3. Backend returns JWT token
4. Token stored in localStorage
5. User data fetched and cached
6. Redirect to home page

### 3. Protected Route Access

1. Check if token exists in localStorage
2. If no token: Show login/register links
3. If token exists: Show protected navigation
4. User data displayed in header

### 4. Logout Flow

1. Remove token from localStorage
2. Clear cached user data
3. Redirect to login page

## 🎨 UI Components

### Login Page (`/login`)

- Email and password fields
- Form validation
- Error handling
- Links to register and reset password

### Register Page (`/register`)

- Username, email, password fields
- Password confirmation
- Form validation
- Link to login

### Reset Password Page (`/reset-password`)

- Email and new password fields
- Password confirmation
- Success/error messages
- Link back to login

### Navigation Header

- **Unauthenticated**: Login/Register links
- **Authenticated**: Welcome message, logout button, protected nav links

## 🔧 Configuration

### API Base URL

Update the `API_BASE_URL` in `src/hooks/useAuth.js`:

```javascript
const API_BASE_URL = "http://localhost:5000/api/auth";
```

### Token Storage

JWT tokens are stored in localStorage:

```javascript
// Store token
localStorage.setItem("authToken", token);

// Retrieve token
const token = localStorage.getItem("authToken");

// Remove token
localStorage.removeItem("authToken");
```

## 🚀 Usage Examples

### Adding Authentication to New Components

```javascript
import { useCurrentUser, isAuthenticated } from "../hooks/useAuth";

const MyComponent = () => {
  const { data: user } = useCurrentUser();
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <div>Please login to access this feature</div>;
  }

  return <div>Welcome {user?.username}!</div>;
};
```

### Programmatic Navigation After Auth

```javascript
import { useNavigate } from "@tanstack/react-router";
import { useLogin } from "../hooks/useAuth";

const login = useLogin();
const navigate = useNavigate();

// Login will automatically redirect to home page
login.mutate({ email, password });
```

## 🛡️ Security Features

### Token Management

- Automatic token storage on login
- Token included in authenticated requests
- Token removal on logout

### Error Handling

- Network error handling
- Backend error message display
- Form validation errors

### Route Protection

- Conditional navigation based on auth status
- Protected routes hidden from unauthenticated users

## 🔄 State Management

### React Query Integration

- Automatic caching of user data
- Background refetching
- Optimistic updates
- Error states

### Authentication State

- Token-based authentication
- Automatic token validation
- User data caching

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend allows requests from frontend origin
   - Check API base URL configuration

2. **Token Not Stored**

   - Check browser localStorage
   - Verify login response format

3. **Protected Routes Not Working**

   - Verify token exists in localStorage
   - Check authentication middleware

4. **User Data Not Loading**
   - Check token validity
   - Verify API endpoint responses

### Debug Commands

```javascript
// Check if authenticated
console.log(isAuthenticated());

// Check stored token
console.log(localStorage.getItem("authToken"));

// Check user data
const { data: user } = useCurrentUser();
console.log(user);
```

## 📝 Testing

### Manual Testing Checklist

- [ ] Registration with valid data
- [ ] Registration with existing email (error)
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error)
- [ ] Password reset with valid email
- [ ] Password reset with invalid email (error)
- [ ] Protected route access (authenticated)
- [ ] Protected route access (unauthenticated)
- [ ] Logout functionality
- [ ] Token persistence across page reloads

## 🔮 Future Enhancements

### Potential Improvements

1. **Email Verification**: Add email verification flow
2. **Password Strength**: Add password strength validation
3. **Remember Me**: Add "remember me" functionality
4. **Social Login**: Integrate OAuth providers
5. **Two-Factor Auth**: Add 2FA support
6. **Session Management**: Add session timeout handling

### Code Examples

```javascript
// Email verification
const verifyEmail = async (token) => {
  return apiCall("/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
};

// Password strength validation
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  return (
    password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
  );
};
```

---

This authentication system provides a solid foundation for your complaint portal. All backend routes are integrated without any changes to your existing backend code! 🎉
