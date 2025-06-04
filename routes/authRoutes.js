import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import {protect,adminOnly} from "../middleware/authMiddleware.js";
const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);
// Route to login a user
router.post('/login', loginUser);
// Protected route example (requires authentication)
router.get('/protected', protect, (req, res) => res.json({ message: 'Protected route accessed successfully' }));
// Admin-only route example (requires admin role)
router.get('/admin-only', protect, adminOnly, (req, res) => res.json({ message: 'Admin-only route accessed successfully' }));


export default  router;
