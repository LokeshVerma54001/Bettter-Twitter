import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, getUserPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', protectRoute, createPost);
router.get('/getUserPosts', protectRoute, getUserPosts);

export default router;