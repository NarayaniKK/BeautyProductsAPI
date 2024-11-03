// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Import the Cart model

// GET all items in the cart for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart.items); // Respond with the items in the cart
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new item to the cart
router.post('/', async (req, res) => {
    const { productId, quantity, userId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // If the cart doesn't exist, create one
            cart = new Cart({ items: [{ productId, quantity }], userId });
        } else {
            // If it exists, check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                // If it exists, update the quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // If it doesn't exist, add the new item
                cart.items.push({ productId, quantity });
            }
        }

        const updatedCart = await cart.save(); // Save the cart to the database
        res.status(201).json(updatedCart); // Respond with the updated cart
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
});

// DELETE an item from the cart by ID
router.delete('/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId); // Remove the item

        await cart.save(); // Save the updated cart
        res.json({ message: 'Cart item deleted successfully' }); // Successful deletion response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
});

module.exports = router; // Export the router
