import mongoose from "mongoose";

// User Scheman banaya h yha pr jo data ko lega login with google se via firebase
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    avatar:{
        type:String,
    },
    credits:{
        type:Number,
        default:100,
        min:0
    },
    plan:{
        type:String,
        enum:["free","pro","enterprise"],
        default:"free"
    }
},{timestamps:true})

// creating the model of the (USER) based on the above schema (userSchema)
const User=mongoose.model("User",userSchema)
export default User