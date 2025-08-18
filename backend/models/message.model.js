import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        typeof: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content:{
        type: String,
        require: true,
    },
    media:[
        {type: String}
    ],
    read:{
        type: Boolean, 
        default: false
    }
}, {timestamps:true})

const Message = mongoose.model("Message", messageSchema);

export default Message