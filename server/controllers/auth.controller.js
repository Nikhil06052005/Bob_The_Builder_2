import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const googleAuth=async (req,res)=>{
    try {
        const {name,email,avatar}=req.body
        if(!email){
            return res.status(400).json({message:"email is required"})
        }
    const user=await User.findOne({email})
    if(!user){
        user=await User.create({name,email,avatar})
    }
    // TOKEN GENERATE
    const token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

    // COOKIE ME TOKEN STORE
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })
    
    // return me user ko bhej do 
    return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`google auth error ${error}`})
    }
}

// LOGOUT LOGIC : cookies ke andar se token ko hata do, logout ho jaoge...
export const logOut=async (req,res)=>{
    try{
        return res.clearCookie("token"),{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
        }
    }
    catch(error){
        return res.status(500).json({message:`log out error ${error}`})
    }
}