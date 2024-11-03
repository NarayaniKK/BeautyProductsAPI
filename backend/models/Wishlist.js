const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true }); // Optional, adds createdAt and updatedAt fields

const wishlistSchema = new mongoose.Schema({
    items: [wishlistItemSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Optional: change to ObjectId if using a User model
        ref: 'User', // Reference to the User model
        required: true
    }
}, { timestamps: true }); // Optional

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
