const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
    },
    paymentIntentId: {
        type: String,
    },
    products: [{
        id: {type: String},
        title: {type: String},
        description: {type: String},
        price: {type: String},
        image: {type: String},
        cartQuantity: {type: Number},
    }],
    subtotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Object,
        required: true,
    },
    delivery_Status: {
        type: String,
        default: 'pending',
    },
    payment_satus: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema)

exports.Order = Order