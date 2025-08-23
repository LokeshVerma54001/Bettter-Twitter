import express from "express";
import { editProfile, getOtherUser, getProfile, getRandomUsers, login, logout, refereshToken, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/editProfile', protectRoute, editProfile);
router.post('/referesh-token', refereshToken);
router.get('/profile', protectRoute, getProfile);
router.get('/getRandomUsers', protectRoute, getRandomUsers);
router.post('/getOtherUser', protectRoute, getOtherUser);
export default router;