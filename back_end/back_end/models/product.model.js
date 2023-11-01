import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    images: [
        {
            url: String,
            caption: String,
            path: String
        },
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required: false
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            // required: false
        }
    ]
});

let Product = mongoose.model('Product', productSchema);
export default Product;