import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    }
});

let Category = mongoose.model('Category', categorySchema);

export default Category;