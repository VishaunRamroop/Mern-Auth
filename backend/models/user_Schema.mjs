import mongoose from "mongoose";
import dotenv from 'dotenv';


const userSchema = new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
lastLogin:{type:Date,default:Date.now},
isVerified:{type:Boolean,default:false},
verifyEmailToken:String,
verifyEmailTokenExpiresAt:Date,
resetPasswordToken:String,
resetPasswordTokenExpiresAt:Date
});



const User = mongoose.model('User',userSchema);
export default User;