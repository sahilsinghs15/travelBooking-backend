import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getLoggedInUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from "../Controllers/user.controller.js";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser);
router.get("/me", isLoggedIn, getLoggedInUserDetails);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update/:id", isLoggedIn,updateUser);

export default router;
