import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

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
        res.json(req.user);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}