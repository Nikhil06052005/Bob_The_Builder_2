// DB ko connect krne ke liye ye file banayi hain (eport krne ke liye)
import mongoose from "mongoose"

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB CONNECTED")
    } catch (error) {
        console.log("DB CONNECTION ERROR", error)
        
    }
}

export default connectDB     
