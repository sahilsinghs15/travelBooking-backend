import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();
import express from 'express';
import morgan from 'morgan';
import errorMiddleware from './Middlewares/error.middleware.js';

const app = express();

// Middlewares

// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third-Party
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(cookieParser());

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

//Import All Routes

import userRoutes from "./Routes/user.routes.js";

app.use("/api/v1/user" , userRoutes);


// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;

