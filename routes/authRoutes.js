import express from "express";
import { registerUser, loginUser, getProfile, logoutUser, refreshToken } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, getProfile);
router.get("/refresh-token", refreshToken);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


export default router;