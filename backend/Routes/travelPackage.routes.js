import { Router } from "express";
import {
    createPackage,
    getAllPackages,
    getPackageById,
    searchPackages
} from "../Controllers/travelPackage.controller.js";

const router = Router();

// Route to search for packages based on query parameters
router.get("/search", searchPackages);

// Route to create a new package
router.post("/create", createPackage);

// Route to get all packages
router.get("/", getAllPackages);

// Route to get a package by ID
router.get("/:id", getPackageById);

export default router;
