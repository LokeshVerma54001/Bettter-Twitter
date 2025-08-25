import { populate } from "dotenv";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import path from "path";

const generateTokens = (userId) =>{
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '60m'
    });

    const refereshToken = jwt.sign({userId}, process.env.REFERESH_TOKEN_SECRET,{
        expiresIn: '7d',
    });

    return {accessToken, refereshToken};
}

const setCookies = (res, accessToken, refereshToken) =>{
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // prevens cross site scripting attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', //prevents cross site request forgery attacks
        maxAge: 15*60*1000,
    })

    res.cookie("refereshToken", refereshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7*24*60*60*1000,
    })
}

export const signup = async (req, res) =>{
    const {email, password, name, username} = req.body;
    try {
        const emailExists = await User.findOne({email});
        const usernameExists = await User.findOne({username});
        if(emailExists) return res.status(400).json({message: "Email already linked to an Account"});
        if(usernameExists) return res.status(400).json({message: "Username already taken"});
        const user = await User.create({name, username, email, password});
        const {accessToken, refereshToken} = generateTokens(user._id);
        // store referesh token
        setCookies(res, accessToken, refereshToken);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isVerified:user.isVerified,
            userrname:user.username
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user && (await user.comparePassword(password))){
            const {accessToken, refereshToken} = generateTokens(user._id);
            // store referesh token in redis
            setCookies(res, accessToken, refereshToken);
            res.json({
                _id: user._id,
                name:user.name,
                email:user.email,
                isVerified:user.isVerified,
                username:user.username,
            })
        }else{
            res.status(400).json({message:"Invalid email or password"});
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const logout = async (req, res) =>{
    try {
        const refereshToken = req.cookies.refereshToken;
        if(refereshToken){
            const decoded = jwt.verify(refereshToken, process.env.REFERESH_TOKEN_SECRET);
            // delete referesh token from redis
        }
        res.clearCookie('accessToken');
        res.clearCookie('refereshToken');
        res.json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message:'server error', error: error.message});
    }
}

export const editProfile = async (req, res) => {
    try {
        const {name, username, profileImage, bannerImage, bio} = req.body;
        const user = await User.findOne(req.user._id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        if(profileImage){
            const cloudinaryResponse = await cloudinary.uploader.upload(profileImage, {folder: 'profileImages'});
            user.profileImage = cloudinaryResponse.secure_url;
        }
        if(bannerImage){
            const cloudinaryResponse = await cloudinary.uploader.upload(bannerImage, {folder: 'bannerImages'});
            user.bannerImage = cloudinaryResponse.secure_url;
        }
        if(name) user.name = name;
        if(username) user.username = username;
        if(bio) user.bio = bio;
        const updatedUser = await user.save();
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        })
    } catch (error) {
        console.log("Error in Edit Profile controller", error.message);
        res.status(500).json({message:"server error", error: error.message});
    }
}

export const refereshToken = async (req, res) =>{
    try {
        const refereshToken = req.cookies.refereshToken;
        if(!refereshToken){
            return res.status(401).json({message:"No referesh token provided"});
        }
        const decoded = jwt.verify(refereshToken, process.env.REFERESH_TOKEN_SECRET);
        // compare with redis token if I ever decide to use that
        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15*60*1000
        });
        res.json({message: 'Token refereshed successfully'});
    } catch (error) {
        console.log('Error in refereshToken controller ', error.message);
        res.status(500).json({message: "Server Error", error:error.message});
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        .select("-password") // hide password
        .populate({
            path: "posts",
            options: { sort: { createdAt: -1 } },
            populate: {
            path: "author",
            select: "username name profileImage",
            },
        })
        .populate({
            path: "likedPosts",
            options: { sort: { createdAt: -1 } },
            populate: {
            path: "author",
            select: "username name profileImage",
            },
        });
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

export const getRandomUsers = async (req, res) => {
    try {
        const users = await User.aggregate([
            {$match: {_id: {$ne: req.user._id}}},
            {$sample: {size: 3}},
            {$project: {password: 0}}
        ]);
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getRandomUsers controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getOtherUser = async (req, res) => {
  try {
    const userId = req.body.id; // this should be just a string
    const user = await User.findById(userId).select("-password")
    .populate({
            path: "posts",
            options: { sort: { createdAt: -1 } },
            populate: {
            path: "author",
            select: "username name profileImage",
            },
        })
        .populate({
            path: "likedPosts",
            options: { sort: { createdAt: -1 } },
            populate: {
            path: "author",
            select: "username name profileImage",
            },
        }).populate({
            path: "following",
            select: "name username bio profileImage"
        }).populate({
            path: "followers",
            select: "name username bio profileImage"
        })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getOtherUser controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const followUser = async(req, res) =>{
    try {
        const {id} = req.body;
        const otherUser = await User.findById(id);
        const user = await User.findById(req.user._id);
        if(!user || !otherUser) return res.status(404).json({message:"User not found"});
        if(user.following.includes(otherUser._id)){
            user.following = user.following.filter((id) => id.toString() !== otherUser._id.toString());
            otherUser.followers = otherUser.followers.filter((id) => id.toString() !== user._id.toString());
            await user.save();
            await otherUser.save();
            res.status(200).json({message: "user unfollowed successfully"});
        }else{
            user.following.push(otherUser._id);
            otherUser.followers.push(user._id);
            await user.save();
            await otherUser.save();
            res.status(200).json({message: "User followed successfully"});
        }
    } catch (error) {
        console.log("Error in followUser controller", error.message);
        res.status(500).json({message: "Server Error", error: error.message});
    }
}