import express from 'express';
import { createBooking, getBookings, updateBooking, deleteBooking } from '../Controllers/booking.controller.js';
import { isLoggedIn } from '../Middlewares/auth.middleware.js';

const router = express.Router();

// Route to create a new booking (requires user to be logged in)
router.post('/', isLoggedIn, createBooking);

// Route to get all bookings of the logged-in user
router.get('/', isLoggedIn, getBookings);

// Route to update a booking (requires user to be logged in)
router.patch('/:id', isLoggedIn, updateBooking);

// Route to delete a booking (requires user to be logged in)
router.delete('/:id', isLoggedIn, deleteBooking);

export default router;
