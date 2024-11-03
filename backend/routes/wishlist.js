const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist'); // Import the Wishlist model

// GET all wishlist items for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const wishlistItems = await Wishlist.find({ userId: req.params.userId });
        res.json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new item to the wishlist for a specific user
router.post('/:userId', async (req, res) => {
    const wishlistItem = new Wishlist({
        items: [{ productId: req.body.productId }],
        userId: req.params.userId // Associate the wishlist with the userId
    });
    
    try {
        const newWishlistItem = await wishlistItem.save();
        res.status(201).json(newWishlistItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE an item from the wishlist by ID
router.delete('/:id', async (req, res) => {
    try {
        const wishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
        if (!wishlistItem) return res.status(404).json({ message: 'Wishlist item not found' });
        res.json({ message: 'Wishlist item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
