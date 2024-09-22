import Booking from '../Models/booking.model.js';  
import TravelPackage from '../Models/travelPackage.model.js'; 
import asynhandler from 'express-async-handler';
import AppError from '../Utils/AppError.js';

/**
 * @CreateBooking
 * @ROUTE POST /api/v1/booking
 * @ACCESS Private (User must be logged in)
 */
export const createBooking = asynhandler(async (req, res, next) => {
    const { travelPackageId, travelDate, travelerDetails, totalTravelers } = req.body;

    // Validate input fields
    if (!travelPackageId || !travelDate || !travelerDetails || !totalTravelers) {
        return next(new AppError('All fields are required', 400));
    }

    // Find the travel package
    const travelPackage = await TravelPackage.findById(travelPackageId);
    if (!travelPackage) {
        return next(new AppError('Travel package not found', 404));
    }

    // Create the booking
    const booking = await Booking.create({
        user: req.user._id,
        travelPackage: travelPackage._id,
        travelDate,
        travelerDetails,
        totalTravelers,
    });

    res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        booking,
    });
});

/**
 * @GetBookings
 * @ROUTE GET /api/v1/booking
 * @ACCESS Private (User must be logged in)
 */
export const getBookings = asynhandler(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('travelPackage', 'title destination price');

    res.status(200).json({
        success: true,
        results: bookings.length,
        bookings ,
    });
});

/**
 * @UpdateBooking
 * @ROUTE PATCH /api/v1/booking/:id
 * @ACCESS Private (User must be logged in)
 */
export const updateBooking = asynhandler(async (req, res, next) => {
    const { travelDate, travelerDetails, totalTravelers } = req.body;
    
    // Find the booking by ID and ensure it belongs to the current user
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) {
        return next(new AppError('Booking not found or you are not authorized', 404));
    }

    // Update fields
    booking.travelDate = travelDate || booking.travelDate;
    booking.travelerDetails = travelerDetails || booking.travelerDetails;
    booking.totalTravelers = totalTravelers || booking.totalTravelers;

    // Save updated booking
    await booking.save();

    res.status(200).json({
        success: true,
        message: 'Booking updated successfully',
        booking,
    });
});

/**
 * @DeleteBooking
 * @ROUTE DELETE /api/v1/bookings/:id
 * @ACCESS Private (User must be logged in)
 */
export const deleteBooking = asynhandler(async (req, res, next) => {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });

    if (!booking) {
        return next(new AppError('Booking not found or you are not authorized', 404));
    }

    // Use deleteOne to remove the booking
    await Booking.deleteOne({ _id: booking._id });

    res.status(200).json({
        success: true,
        message: 'Booking deleted successfully',
    });
});