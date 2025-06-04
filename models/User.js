import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /.+\@.+\..+/, // Simple email validation
        lowercase: true, // Store email in lowercase
    },
    password:{
        type:String,
        required:true,
        minLength:6, // Minimum length for password
    },
    role:{
        type:String,
        enum:['user', 'admin'], // Only allow 'user' or 'admin'
        default:'user', // Default role is 'user'
    },
},{
    timestamps:true,
})

const User = mongoose.model('User', userSchema);
export default User;
