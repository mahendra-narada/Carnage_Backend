import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";


dotenv.comfig();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes

app.get('/',(req,res)=>{
    res.send('Server is Runnin');
});

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})