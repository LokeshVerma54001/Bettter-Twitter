import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
    content: {
        type: String, 
        maxlength: 200,
        required: true,
    },
    media: [
        {type:String}
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    retweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    replies:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    isReply:{
        type: Boolean, 
        default: false
    },
    parentPost:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Post"
    },
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;