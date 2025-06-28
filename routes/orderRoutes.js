import express from 'express';
import { createOrder,getUserOrders,getOrderById,updateOrderStatus,deleteOrder,getAllOrders} from '../controllers/orderController.js';

const router = express.Router();

import { protect, adminOnly } from '../middleware/authMiddleware.js';

// Route to create a new order
router.route('/')
    .post(protect, createOrder); // Create a new order
// Route to get all orders for a user
router.route('/user')
    .get(protect, getUserOrders); // Get all orders for the authenticated user
// Route to get a specific order by ID
router.route('/:id')
    .get(protect, getOrderById) // Get order by ID
    .delete(protect, deleteOrder); // Delete order by ID
// Route to update order status
router.route('/:id/status')
    .put(protect, adminOnly, updateOrderStatus); // Update order status
// Route to get all orders (Admin)
router.route('/admin')
    .get(protect, adminOnly, getAllOrders); // Get all orders for admin

export default router;