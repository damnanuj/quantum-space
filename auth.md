
# Authentication API

## 1. Register
- **URL**: `/api/auth/signup`
- **Method**: POST
- **Description**: Register a new user.
- **Request Body**:
  - `name`: string (required)
  - `username`: string (required)
  - `email`: string (required)
  - `gender`: string (required)
  - `password`: string (required)
- **Response**:
  - 201 Created: `{ "success": true, "message": "User Registered Successfully"}`
  - 400 Bad Request: `{ "success": false, "message": "Validation error message" }`

## 2. Login
- **URL**: `/api/auth/login`
- **Method**: POST
- **Description**: Log in an existing user.
- **Request Body**:
  - `email`: string (required)
  - `password`: string (required)
- **Response**:
  - 200 OK: `{"success": true, "message": "Welcome back ${username}", "data: userData }`
  - 401 Unauthorized: `{"success": false, "message": "Invalid credentials" }`

## 3. Logout
- **URL**: `/api/auth/logout`
- **Method**: POST
- **Description**: Log out the current user.
- **Response**:
  - 200 OK: `{"success": true, "message": "Logout successful" }`
