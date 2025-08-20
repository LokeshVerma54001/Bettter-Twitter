import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
    try {
        const {content, media} = req.body;
        const user = await User.findOne(req.user._id);
        if(!user){
            return res.status(404).json({message: "User not Found"});
        }
        let mediaLinks = [];
        if(media && media.length > 0){
            const uploadPromises = media.map(file => 
                cloudinary.uploader.upload(file, {
                    folder: "posts"
                })
            )
            const results = await Promise.all(uploadPromises);
            mediaLinks = results.map(r => r.secure_url);
        }
        const post = await Post.create({
            content, 
            media: mediaLinks,
            author: user._id,
        });
        if(user.posts){
            user.posts.push(post._id);
            await user.save();
        }
        const allUserPosts = await Post.find({author:user._id})
            .populate("author", "username profileImage")
            .sort({createdAt: -1});
        return res.status(201).json({
            message: "Post created successfully",
            userPosts:allUserPosts
        })
    } catch (error) {
        console.log("Error creating post controller:", error);
        return res.status(500).json({message: "Server error", error: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const userPosts = await Post.find({author: req.user._id})
            .populate("author", "username ProfileImage")
            .sort({createdAt: -1});
        res.status(200).json({
            message: "Post created successfully",
            userPosts
        })
    } catch (error) {
        console.log("Error getting user Posts controller:", error);
        return res.status(500).json({message: "Server error", error: error.message});
    }
}