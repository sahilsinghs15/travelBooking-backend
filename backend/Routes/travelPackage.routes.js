import { createPackage } from "../Controllers/travelPackage.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create" , createPackage);

export default router;