import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, createReply, getAllPosts, getPostDetails,  likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', protectRoute, createPost);
router.get('/getAllPosts', protectRoute, getAllPosts);
router.post('/getPostDetails', protectRoute, getPostDetails);
router.post('/createReply', protectRoute, createReply);
router.post('/likePost', protectRoute, likePost);

export default router;