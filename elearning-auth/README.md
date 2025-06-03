# E-Learning Auth API

A Node.js Express API for fetching dummy user data from an external API.

## Project Structure

```
elearning-auth/
├── index.js                  # Main application entry point
├── package.json              # Project dependencies and scripts
├── src/
│   ├── config/               # Configuration files
│   │   └── api.js            # API endpoints configuration
│   ├── controllers/          # Request handlers
│   │   └── userController.js # User-related controllers
│   ├── models/               # Data models
│   │   └── User.js           # User model
│   ├── routes/               # API routes
│   │   └── userRoutes.js     # User-related routes
│   └── utils/                # Utility functions
│       ├── apiClient.js      # HTTP client for external API requests
│       └── testApi.js        # Test script for API endpoints
```

## Features

- Fetch dummy user data from JSONPlaceholder API
- Get all users
- Get user by ID
- Error handling
- Clean architecture with separation of concerns

## API Endpoints

- `GET /` - Welcome message and available endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Development Mode

```
npm run dev
```

### Production Mode

```
npm run server
```

## Testing the API

You can test the API using the provided test script:

```
node src/utils/testApi.js
```

Make sure the server is running before executing the test script.

## Technologies Used

- Node.js
- Express.js
- Axios for HTTP requests
- Nodemon for development
- CORS for cross-origin resource sharing

## CORS Support

This API includes comprehensive CORS support, allowing it to be accessed from different domains or ports. This is particularly useful for frontend applications that need to make API requests from a different origin.

### CORS Configuration

The API is configured with multiple layers of CORS protection:

1. **Global CORS Middleware**: All routes are protected by the CORS middleware with permissive settings.
2. **Custom CORS Headers**: A custom middleware sets CORS headers on all responses.
3. **Route-Specific CORS Handling**: Each route has explicit CORS handling to ensure maximum compatibility.
4. **OPTIONS Preflight Support**: The API properly handles OPTIONS preflight requests.

### Troubleshooting CORS Issues

If you're experiencing CORS-related issues (such as 403 Forbidden errors), try the following:

1. Ensure your client is sending the appropriate headers (Origin, Referer, etc.)
2. Check that your client is using the correct HTTP methods
3. Verify that your client is using the correct content types
4. If using credentials (cookies), ensure your client is configured to send them
