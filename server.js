import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ProductRoutes from './routes/ProductRoutes.js';
import CartRoutes from './routes/cartRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import PaymentRoutes from './routes/paymentRoutes.js';


//Load environment variables
dotenv.config();
//Connect to the database
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api',authRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/payment', PaymentRoutes);


app.get('/',(req,res)=>{
    res.send('Server is Running');
});

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})