# 📚 API Documentation

## Backend Integration

This frontend integrates with your existing backend authentication system. No changes to your backend code are required.

## 🔗 Base URL

```
http://localhost:5000/api/auth
```

## 📋 Available Endpoints

### 1. User Registration

**POST** `/api/auth/register`

Creates a new user account.

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**

```json
{
  "message": "User registered successfully"
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "Email already exists"
}
```

---

### 2. User Login

**POST** `/api/auth/login`

Authenticates user and returns JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized):**

```json
{
  "error": "Invalid email or password"
}
```

---

### 3. Password Reset

**POST** `/api/auth/reset`

Resets user password.

**Request Body:**

```json
{
  "email": "john@example.com",
  "newpassword": "newsecurepassword123"
}
```

**Response (201 Created):**

```json
{
  "message": "new Password updated"
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "Invalid Email address"
}
```

---

### 4. Get Current User

**GET** `/api/auth/user`

Retrieves current user information (requires authentication).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**

```json
{
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Error Response (401 Unauthorized):**

```json
{
  "error": "No authentication token"
}
```

**Error Response (404 Not Found):**

```json
{
  "error": "User not found"
}
```

---

## 🔐 Authentication

### JWT Token

- **Type**: Bearer token
- **Storage**: localStorage
- **Expiration**: 1 hour (configurable in backend)
- **Usage**: Include in Authorization header for protected routes

### Token Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🚨 Error Handling

### Common Error Codes

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid credentials)
- **404**: Not Found (user not found)
- **500**: Internal Server Error

### Error Response Format

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

---

## 🔧 Frontend Integration

### React Query Hooks

The frontend uses custom React Query hooks for all API calls:

```javascript
// Registration
const register = useRegister();
register.mutate({ username, email, password });

// Login
const login = useLogin();
login.mutate({ email, password });

// Password Reset
const resetPassword = useResetPassword();
resetPassword.mutate({ email, newpassword });

// Get Current User
const { data: user, isLoading, error } = useCurrentUser();
```

### Automatic Features

- **Token Storage**: Automatically stored on login
- **Token Removal**: Automatically removed on logout
- **Error Handling**: Automatic error display
- **Loading States**: Built-in loading indicators
- **Navigation**: Automatic redirects after actions

---

## 🧪 Testing

### Using Postman/Insomnia

1. **Register a new user:**

   ```
   POST http://localhost:5000/api/auth/register
   Content-Type: application/json

   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

2. **Login:**

   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Get user info (with token):**

   ```
   GET http://localhost:5000/api/auth/user
   Authorization: Bearer <token_from_login>
   ```

4. **Reset password:**

   ```
   POST http://localhost:5000/api/auth/reset
   Content-Type: application/json

   {
     "email": "test@example.com",
     "newpassword": "newpassword123"
   }
   ```

---

## 🔄 CORS Configuration

Ensure your backend allows requests from the frontend:

```javascript
// In your backend app.js
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);
```

---

## 📝 Notes

- All endpoints return JSON responses
- Passwords are hashed on the backend using bcrypt
- JWT tokens are signed with your JWT_SECRET
- User data is cached using React Query for performance
- Error messages are user-friendly and displayed in the UI

This API documentation covers all the endpoints your frontend uses. The integration is seamless and requires no backend modifications! 🎉
