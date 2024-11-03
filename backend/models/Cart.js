const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // Ensure quantity is at least 1
    }
}, { timestamps: true }); // Optional, adds createdAt and updatedAt fields

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema], // Array of cart items
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Change to ObjectId if using a User model
        ref: 'User', // Reference to the User model (if applicable)
        required: true
    }
}, { timestamps: true }); // Optional

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
