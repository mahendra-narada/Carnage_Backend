import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter product name'],
    },
    description:{
        type:String,
        required:[true,'Please enter product description']
    },
    price:{
        type:Number,
        required:[true,'Please enter product price'],
        min:0
    },
    image:{
        type:String,
        required:[true,'Please enter product image URL']
    },
    category:{
        type:String,
        required:[true,'Please enter product category']
    },
    brand:{
        type:String,
        required:[true,'Please enter product brand']
    },
    countInStock:{
        type:Number,
        required:[true,'Please enter product stock count'],
        min:0,
        default:0
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    numReviews:{
        type:Number,
        default:0,
        min:0
    },
},{
    timestamps:true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
