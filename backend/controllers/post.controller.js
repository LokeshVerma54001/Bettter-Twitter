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

export const getAllPosts = async (req, res) => {
  try {
    const { lastCreatedAt } = req.query; // frontend sends last post timestamp
    const limit = parseInt(req.query.limit) || 20;

    let query = {};
    if (lastCreatedAt) {
      query.createdAt = { $lt: new Date(lastCreatedAt) }; 
    }

    const posts = await Post.find(query)
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPostDetails = async (req, res) => {
    try {
        const {id} = req.body;
        const post = await Post.findOne({_id: id}).populate("author", "username name profileImage");
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        return res.status(200).json({message: "Post details found successfully", post});
    } catch (error) {
        console.log("Error in getPostdetails controller", error.message);
        return res.status(500).json({message: "Server Error", error: error.message});
    }
}
