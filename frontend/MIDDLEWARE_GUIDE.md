# 🔒 Middleware & Route Protection Guide

## Overview

This guide explains how to use the middleware and route protection system in your complaint portal. The system provides multiple ways to protect routes and handle authentication states.

## 🏗️ Architecture

### Components

- **AuthMiddleware**: Main middleware component for route protection
- **PrivateRoute**: Simple wrapper for protected routes
- **withAuth HOC**: Higher-order component for easy route protection
- **useRouteGuard**: Custom hook for route protection logic

### File Structure

```
src/
├── components/
│   ├── AuthMiddleware.js      # Main middleware component
│   ├── PrivateRoute.js        # Simple route protection
│   └── withAuth.js           # Higher-order components
├── hooks/
│   └── useRouteGuard.js      # Route protection hooks
└── pages/
    ├── ProtectedComplaintsPage.js    # Protected route example
    ├── PublicLoginPage.js           # Public route example
    └── ...
```

## 🔧 Usage Methods

### 1. Using AuthMiddleware Component

#### Protected Routes

```javascript
import AuthMiddleware from "../components/AuthMiddleware";
import MyProtectedPage from "./MyProtectedPage";

const ProtectedPage = () => {
  return (
    <AuthMiddleware requireAuth={true}>
      <MyProtectedPage />
    </AuthMiddleware>
  );
};
```

#### Public Routes (redirects authenticated users)

```javascript
import AuthMiddleware from "../components/AuthMiddleware";
import LoginPage from "./LoginPage";

const PublicLoginPage = () => {
  return (
    <AuthMiddleware requireAuth={false}>
      <LoginPage />
    </AuthMiddleware>
  );
};
```

### 2. Using Higher-Order Components (HOC)

#### Protected Routes

```javascript
import { withPrivateAuth } from "../components/withAuth";
import MyPage from "./MyPage";

const ProtectedMyPage = withPrivateAuth(MyPage);
export default ProtectedMyPage;
```

#### Public Routes

```javascript
import { withPublicAuth } from "../components/withAuth";
import LoginPage from "./LoginPage";

const PublicLoginPage = withPublicAuth(LoginPage);
export default PublicLoginPage;
```

### 3. Using Custom Hooks

#### Protected Routes

```javascript
import { useProtectedRoute } from "../hooks/useRouteGuard";

const MyProtectedPage = () => {
  const { isAuthenticated, isLoading, hasError, user } = useProtectedRoute();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Authentication error</div>;
  }

  if (!isAuthenticated) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Welcome {user?.username}!</h1>
      {/* Your protected content */}
    </div>
  );
};
```

#### Public Routes

```javascript
import { usePublicRoute } from "../hooks/useRouteGuard";

const LoginPage = () => {
  const { isAuthenticated, user } = usePublicRoute();

  // If user is authenticated, they'll be redirected to home
  // This component will only render for unauthenticated users

  return (
    <div>
      <h1>Login</h1>
      {/* Login form */}
    </div>
  );
};
```

## 🛡️ Protection Features

### Authentication Checks

- **Token Validation**: Checks if JWT token exists in localStorage
- **Token Expiry**: Validates token with backend API
- **Automatic Redirects**: Redirects users based on authentication status
- **Error Handling**: Handles invalid/expired tokens

### Route Types

#### Protected Routes (`requireAuth={true}`)

- **Access**: Only authenticated users
- **Unauthenticated**: Redirects to `/login`
- **Invalid Token**: Clears token and redirects to `/login`
- **Examples**: `/complaints`, `/complaints/new`

#### Public Routes (`requireAuth={false}`)

- **Access**: Only unauthenticated users
- **Authenticated**: Redirects to `/` (home)
- **Examples**: `/login`, `/register`, `/reset-password`

#### Mixed Routes

- **Access**: Both authenticated and unauthenticated users
- **No Redirects**: Users stay on the page
- **Examples**: `/` (home page)

## 🎯 Implementation Examples

### Creating a New Protected Page

#### Method 1: Using AuthMiddleware

```javascript
// pages/MyProtectedPage.js
import React from "react";
import AuthMiddleware from "../components/AuthMiddleware";

const MyProtectedPage = () => {
  return (
    <div>
      <h1>Protected Content</h1>
      <p>Only authenticated users can see this.</p>
    </div>
  );
};

const ProtectedMyPage = () => {
  return (
    <AuthMiddleware requireAuth={true}>
      <MyProtectedPage />
    </AuthMiddleware>
  );
};

export default ProtectedMyPage;
```

#### Method 2: Using HOC

```javascript
// pages/MyProtectedPage.js
import React from "react";
import { withPrivateAuth } from "../components/withAuth";

const MyProtectedPage = () => {
  return (
    <div>
      <h1>Protected Content</h1>
      <p>Only authenticated users can see this.</p>
    </div>
  );
};

export default withPrivateAuth(MyProtectedPage);
```

#### Method 3: Using Hook

```javascript
// pages/MyProtectedPage.js
import React from "react";
import { useProtectedRoute } from "../hooks/useRouteGuard";

const MyProtectedPage = () => {
  const { isAuthenticated, isLoading, user } = useProtectedRoute();

  if (isLoading) {
    return <div>Verifying authentication...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please login to access this page.</div>;
  }

  return (
    <div>
      <h1>Welcome {user?.username}!</h1>
      <p>This is protected content.</p>
    </div>
  );
};

export default MyProtectedPage;
```

### Adding Routes to Router

```javascript
// router.js
import MyProtectedPage from "./pages/MyProtectedPage";

const myProtectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-protected-page",
  component: MyProtectedPage,
});

// Add to route tree
const routeTree = rootRoute.addChildren([
  // ... other routes
  myProtectedRoute,
]);
```

## 🔄 State Management

### Loading States

- **Initial Load**: Shows loading while checking authentication
- **Token Validation**: Shows loading while validating token with backend
- **Navigation**: Smooth transitions between states

### Error Handling

- **Invalid Token**: Automatically clears token and redirects
- **Network Errors**: Handles API failures gracefully
- **User Feedback**: Clear error messages for users

### Authentication Flow

1. **Check Token**: Verify token exists in localStorage
2. **Validate Token**: Call backend to validate token
3. **Handle Response**:
   - Valid token → Allow access
   - Invalid token → Clear token and redirect
   - No token → Redirect to login

## 🎨 UI States

### Loading State

```javascript
<div style={{ textAlign: "center" }}>
  <h2>⏳ Loading...</h2>
  <p>Verifying your authentication...</p>
</div>
```

### Access Restricted State

```javascript
<div style={{ textAlign: "center" }}>
  <h2>🔒 Access Restricted</h2>
  <p>Please login to access this page</p>
  <p>Redirecting to login...</p>
</div>
```

### Authentication Error State

```javascript
<div style={{ textAlign: "center" }}>
  <h2>❌ Authentication Error</h2>
  <p>Your session has expired. Please login again.</p>
  <p>Redirecting to login...</p>
</div>
```

## 🚀 Best Practices

### 1. Choose the Right Method

- **Simple Protection**: Use `AuthMiddleware` component
- **Reusable Components**: Use HOC pattern
- **Custom Logic**: Use `useRouteGuard` hook

### 2. Error Handling

- Always handle loading and error states
- Provide clear feedback to users
- Log errors for debugging

### 3. Performance

- Use React.memo for expensive components
- Avoid unnecessary re-renders
- Cache authentication state

### 4. Security

- Never expose sensitive data in client-side code
- Always validate tokens with backend
- Clear tokens on logout/expiry

## 🐛 Troubleshooting

### Common Issues

1. **Infinite Redirects**

   - Check authentication logic
   - Verify route protection settings
   - Ensure proper token validation

2. **Loading Forever**

   - Check network connectivity
   - Verify backend API endpoints
   - Check token format

3. **Access Denied for Authenticated Users**
   - Verify token storage
   - Check backend token validation
   - Ensure proper route configuration

### Debug Commands

```javascript
// Check authentication status
console.log("Token:", localStorage.getItem("authToken"));
console.log("Is Authenticated:", isAuthenticated());

// Check route guard state
const { isAuthenticated, isLoading, hasError, user } = useProtectedRoute();
console.log("Route Guard State:", {
  isAuthenticated,
  isLoading,
  hasError,
  user,
});
```

## 📝 Summary

The middleware system provides:

✅ **Multiple Protection Methods**: Components, HOCs, and hooks
✅ **Automatic Redirects**: Based on authentication status
✅ **Token Validation**: Real-time token checking
✅ **Error Handling**: Graceful error management
✅ **Loading States**: User-friendly loading indicators
✅ **Flexible Implementation**: Choose the method that fits your needs

This system ensures your routes are properly protected and provides a smooth user experience! 🎉
