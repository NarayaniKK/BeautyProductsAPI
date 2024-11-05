const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Referencing to the Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // Ensuring quantity is at least 1
    }
}, { timestamps: true }); 

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema], // Array of cart items
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true
    }
}, { timestamps: true }); 

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
