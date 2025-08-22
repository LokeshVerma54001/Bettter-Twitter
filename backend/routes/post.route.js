import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, createReply, getAllPosts, getPostDetails, getUserPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', protectRoute, createPost);
router.get('/getUserPosts', protectRoute, getUserPosts);
router.get('/getAllPosts', protectRoute, getAllPosts);
router.post('/getPostDetails', protectRoute, getPostDetails);
router.post('/createReply', protectRoute, createReply);

export default router;