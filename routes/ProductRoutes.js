import express from 'express';
import {getProductById, getAllProducts,createProduct,deleteProduct,updateProduct} from '../controllers/productController.js';
import {protect,adminOnly} from '../middleware/authMiddleware.js';

const router = express.Router(); 

router.route('/')
.get(getAllProducts)
.post(protect, adminOnly, createProduct);

router.route('/:id')
.get(getProductById)
.put(protect, adminOnly, updateProduct)
.delete(protect, adminOnly, deleteProduct);

export default router;