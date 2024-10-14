import mongoose from "mongoose";

const userInfoSchema =new mongoose.Schema({
    country:String,
    zipCode:String,
    city:String,
    address:String,
    phone:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const UserInfo =mongoose.model("UserInfo",userInfoSchema)
export default UserInfo