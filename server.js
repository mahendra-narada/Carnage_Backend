import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ProductRoutes from './routes/ProductRoutes.js';


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


app.get('/',(req,res)=>{
    res.send('Server is Running');
});

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})