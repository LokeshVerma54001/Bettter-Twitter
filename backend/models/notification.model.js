import mongoose from "mongoose";
import { type } from "os";

const notificationSchema = new mongoose.Schema({
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type:{
        type:String,
        enum:["like", "reply", "retweet", "follow"],
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    read: {
        type: Boolean,
        default: false
    }
}, {timestamps:true});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;