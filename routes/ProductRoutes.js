import express from 'express';
import {getProductById, getAllProducts,createProduct,deleteProduct,updateProduct} from '../controllers/productController.js';
import {protect,adminOnly} from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router(); 

router.route('/')
.get(getAllProducts)
.post(protect, adminOnly, createProduct);

router.route('/:id')
.get(getProductById)
.put(protect, adminOnly, updateProduct)
.delete(protect, adminOnly, deleteProduct);

// upload product image
router.post('/upload',protect, adminOnly, upload.single('image'), (req, res) => res.json({ message: 'Image uploaded successfully',
    imageUrl: req.file.path
 }));


export default router;