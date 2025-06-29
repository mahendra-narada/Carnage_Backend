import express from 'express';
import {createCheckoutSession} from '../controllers/paymentcontroller.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

// Route to create a checkout session
router.route('/checkout')
    .post(protect, createCheckoutSession); // Create a checkout session

export default router;