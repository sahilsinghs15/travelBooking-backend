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

/**
 * @Get All Packages
 * @ROUTE @GET {{URL}}/api/v1/travelPackage
 * @ACCESS Public
 */
export const getAllPackages = asynhandler(async (req, res, next) => {
    try {
        const packages = await TravelPackage.find();
        res.status(200).json({
            success: true,
            results: packages.length,
            packages,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @Get Package by ID
 * @ROUTE @GET {{URL}}/api/v1/travelPackage/:id
 * @ACCESS Public
 */
export const getPackageById = asynhandler(async (req, res, next) => {
    const { package_id } = req.params;

    const travelPackage = await TravelPackage.findOne(package_id);

    if (!travelPackage) {
        return next(new AppError("Package not found", 404));
    }

    res.status(200).json({
        success: true,
        travelPackage,
    });
});

/**
 * @Search Packages
 * @ROUTE @GET {{URL}}/api/v1/travelPackage/search
 * @ACCESS Public
 */
export const searchPackages = asynhandler(async (req, res, next) => {
    const { 
        destination, 
        startDate, 
        endDate, 
        minPrice, 
        maxPrice, 
        minRating, 
        maxRating,
        minDuration,  
        maxDuration   
    } = req.query;

    // Build the query object
    let query = {};

    // Apply filters based on query parameters
    if (destination) {
        query.destination = new RegExp(destination, 'i'); 
    }
    if (startDate && endDate) {
        query.start_date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Check for minPrice and maxPrice and parse them as floats
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Check for ratings filters
    if (minRating || maxRating) {
        query.ratings = {};
        if (minRating) query.ratings.$gte = parseFloat(minRating);
        if (maxRating) query.ratings.$lte = parseFloat(maxRating);
    }

    // Check for duration filters
    if (minDuration || maxDuration) {
        query.duration = {};
        if (minDuration) query.duration.$gte = parseInt(minDuration);
        if (maxDuration) query.duration.$lte = parseInt(maxDuration);
    }

    try {
        const packages = await TravelPackage.find(query);
        res.status(200).json({
            success: true,
            results: packages.length,
            packages,
        });
    } catch (error) {
        next(error);
    }
});