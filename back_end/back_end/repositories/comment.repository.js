import Comment from "../models/comment.model.js";

const commentsRepository = {
    create: async (data) => {
        return await Comment.create(data);
    },
    getById: async (id) => {
        return await Comment.findById(id);
    }
};

export default commentsRepository;