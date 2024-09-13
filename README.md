# Travel Booking Backend API

This is the backend service for the Travel Booking web application, built using **Node.js**, **Express**, and **MongoDB**. It provides API endpoints for user authentication, travel packages, and booking management.

## Features
- User registration, login, and profile management
- JWT-based authentication with password hashing using bcrypt
- Travel packages listing and booking creation
- Middleware for error handling and async operations
- MongoDB for data storage using Mongoose

## Installation and Setup

To set up the backend server locally, follow these steps:

1. **Clone the repository:**
   ```
   https://github.com/sahilsinghs15/travelBooking-backend.git

### Navigate into the project directory:
```
  cd backend
```
### Install dependencies:
```
  npm install
```
### Set up environment variables:

## Create a .env file in the root directory and add the following:

#env

```
  MONGO_URI=your_mongo_connection_string
  JWT_SECRET=your_jwt_secret_key
  SMTP_HOST=your_smtp_host
  SMTP_PORT=your_smtp_port
  SMTP_USER=your_email_address
  SMTP_PASS=your_email_password
```

# Start the server:

```
`npm run start
```
The server should be running at http://localhost:5500.

### API Endpoints
# User Routes
```
  POST /api/users/register: Register a new user
  POST /api/users/login: Log in a user
  POST /api/users/logout: Log out the current user
  GET /api/users/me: Get details of the logged-in user (requires authentication)
```
# Travel Package Routes
```
  GET /api/travelpackages/search: Search for packages based on query parameters
  POST /api/travelpackages/create: Create a new travel package (admin only, not exposed to frontend)
  GET /api/travelpackages/: Get all travel packages
  GET /api/travelpackages/:id: Get details of a specific travel package
```
# Booking Routes
```
  POST /api/bookings/: Create a new booking (requires authentication)
  GET /api/bookings/: Get all bookings for the logged-in user (requires authentication)
  PATCH /api/bookings/:id: Update a booking (requires authentication)
  DELETE /api/bookings/:id: Delete a booking (requires authentication)
```
# Scripts
```
  npm run start: Starts the backend server using nodemon.
  npm install: Installs the required dependencies.
```
### Dependencies Overview
## Key dependencies used in this project:

// Server setup and middleware
```
  import express from 'express';
  import mongoose from 'mongoose';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import morgan from 'morgan';
```

// Authentication and security
```
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import cookieParser from 'cookie-parser';
```

// Email service
```
  import nodemailer from 'nodemailer';
```

// Error handling
```
  import asyncHandler from 'express-async-handler';
```

### Contribution
If you'd like to contribute to the project, feel free to fork the repository, create a new branch, and submit a pull request. Any contributions are welcome!

