const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true,
            'Title is required'
        ]
    },
    description: {
        type: String,
        required: [
            true,
            'Description is required'
        ]
    },
    price: {
        type: Number,
        required: [
            true,
            'Price is required'
        ]
    },
}, { timestamps: true });

module.exports.Product = mongoose.model('Product', ProductSchema);