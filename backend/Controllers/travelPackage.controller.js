import TravelPackage from "../Models/travelPackage.model.js";
import asynhandler from "express-async-handler";
import AppError from "../Utils/AppError.js";

/**
 * @Create
 * @ROUTE @POST {{URL}}/api/v1/travelPackage/create
 * @ACCESS Public
 */

export const createPackage = asynhandler(async (req, res, next) => {
    const {
        title, 
        image_url, 
        destination, 
        price, 
        duration, 
        ratings, 
        description, 
        start_date, 
        end_date, 
        itinerary, 
        inclusions, 
        exclusions 
    } = req.body;

    // Validate required fields
    if (!title || !image_url || !destination || !price || !duration || !description || !start_date || !end_date || !itinerary || !inclusions || !exclusions) {
        return next(new AppError("All fields are required", 400));
    }

    // Check if package already exists
    const packageExists = await TravelPackage.findOne({ destination });

    if (packageExists) {
        return next(new AppError("Package already exists", 409));
    }

    // Create new travel package
    const travelPackage = await TravelPackage.create({
        title,
        image_url,
        destination,
        price,
        duration,
        ratings,
        description,
        start_date,
        end_date,
        itinerary,
        inclusions,
        exclusions
    });

    if (!travelPackage) {
        return next(new AppError("Unable to create package, try again", 400));
    }

    // Send the response
    res.status(201).json({
        success: true,
        message: "Package created successfully",
        travelPackage,
    });
});
