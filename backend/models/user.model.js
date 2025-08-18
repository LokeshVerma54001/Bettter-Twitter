import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true, // important for @handles
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },

  // Profile / bio
  bio: {
    type: String,
    maxlength: 160, // same limit as Twitter
    default: "",
  },
  profileImage: {
    type: String, // store image URL (S3, Cloudinary, etc.)
    default: "https://placehold.co/200x200?text=Profile",
  },
  bannerImage: {
    type: String,
    default: "",
  },
  // Social graph
  followers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
  following: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
  // Content
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  ],
  likedPosts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  ],
  retweets: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  ],

  // Premium / verification
  isVerified: {
    type: Boolean,
    default: false,
  },
  // Account info
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;