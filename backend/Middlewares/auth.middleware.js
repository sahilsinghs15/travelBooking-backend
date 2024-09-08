import jwt from 'jsonwebtoken';
import AppError from '../Utils/AppError.js';
import asynhandler from 'express-async-handler';
import User from '../Models/user.model.js'; 

export const isLoggedIn = asynhandler(async (req, _res, next) => {
  // extracting token from the cookies
  const { token } = req.cookies;

  // If no token, send unauthorized message
  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // If no decoded token, send unauthorized message
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // Fetch user details from the database using the user ID from the decoded token
  const user = await User.findById(decoded.id);

  // If no user found, send unauthorized message
  if (!user) {
    return next(new AppError("User not found, please login again", 401));
  }

  // Attach the full user object (without the password) to the request object
  req.user = user;

  // Pass control to the next middleware or route handler
  next();
});
