import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: String
    },
    text: {
        type: String
    },
    content: {
        type: String
    }
});

let Comment = mongoose.model('Comment', commentSchema);

export default Comment;