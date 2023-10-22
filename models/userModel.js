import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    lname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:{},
        required:true,
    },
    role:{
        type:Number,
        default:0,
    },
    apartement:{
        type:String,
        required:false,
    },
    city:{
        type: String,
        required:true,
    },
    governorate:{
        type: String,
        required:true,
    },
    postalCode:{
        type:String,
        required:true,
    },
   

    

},{timestamps:true}
);

export default mongoose.model('users',userSchema);