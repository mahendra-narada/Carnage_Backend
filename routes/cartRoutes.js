import express from 'express';
import { getCart,addtoCart,removeFromCart,clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router(); 

// Route to get cart items
router.route('/')
    .get(protect, getCart) // Get cart items
    .post(protect, addtoCart); // Add item to cart

// Route to remove item from cart
router.route('/:productId')
    .delete(protect, removeFromCart); // Remove item from cart

// Route to clear cart
router.route('/clear')
    .delete(protect, clearCart); // Clear cart

export default router;
