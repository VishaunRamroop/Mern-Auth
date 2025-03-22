import mongoose from "mongoose";
import {randomBytes} from 'node:crypto'
import User from "../models/user_Schema.mjs";
import bcryptjs from 'bcryptjs';
import generateEmailVerificationToken from '../util/generateVerifyEmailToken.mjs';
import {sendWelcomeEmail,forgotPasswordSender,resetPasswordSuccessful}from '../Mailer/email.mjs'
import generateCookie from '../util/generateCookie.mjs'
async function signup(req,res) {
  const {name,email,password}= req.body;
  try {
    const userCheck = await User.findOne({email});

    if(userCheck){
      return res.status(400).json({success:false,message:`User already exists`})
    };

    const hashedPassword = await bcryptjs.hash(password,10);
    const emailVerificationToken = generateEmailVerificationToken();
    
    const user = new User({
      name,
      email,
      password:hashedPassword,
      verifyEmailToken:emailVerificationToken,
      verifyEmailTokenExpiresAt: Date.now() +24*60*60*1000


    });
  
    await user.save()
    await generateCookie(res,user._id);
    await sendWelcomeEmail(emailVerificationToken,email)
    res.status(201).json({
      success:true,message:`User signed up successfully`, user:{...user._doc,password:undefined}
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:`Error signing up`})
  }
}

async function login(req,res) {
  const {email,password} = req.body;
  try {
    console.log(email,password)
    const checkUser =await  User.findOne({email});
    console.log(checkUser)
    if(!checkUser){
      return res.status(400).json({success:false,message:'Invalid credentials'})
    };
let hashedPassword = checkUser.password
    // console.log(hashedPassword)
    const compareHashedPassword =await bcryptjs.compare(password,hashedPassword );
    // console.log(compareHashedPassword)
    if(!compareHashedPassword){
      return res.status(400).json({success:false,message:'Invalid credentials'})
    }
    await generateCookie(res,checkUser._id);
    checkUser.lastLogin= new Date();
    await checkUser.save();
    res.status(200).json({success:true,message:`Logged in successfully`,user:{...checkUser._doc ,password:undefined}})
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:`Error loggin in`})
  }
  
}


async function logout(req,res){
  try {
    await res.clearCookie('token');
    res.status(200).json({success:true,message:`Logged out successfully`})
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:`Error logging out`})
  }
}

async function verifyUser(req,res){
  const{token}= req.body;
  try {
    const checkUser = await User.findOne({verifyEmailToken:token,verifyEmailTokenExpiresAt:{$gt:Date.now()}})
    if(!checkUser){
      return   res.status(400).json({success:false,message:`Invalid token`})
    };
    // console.log(checkUser)
    // console.log(token)
    checkUser.isVerified= true;
    checkUser.verifyEmailToken= undefined;
    checkUser.verifyEmailTokenExpiresAt= undefined;
    await checkUser.save();
    //send welcome email
    return res.status(200).json({success:true,message:`User successfully verified!`,user:{...checkUser._doc,password:undefined}})
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:`Server Error `})
  }
}

async function resetVerificationToken(req,res){
  const {email}= req.body;
  try {
    const newEmailVerificationToken = generateEmailVerificationToken()

  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:`Server Error `})
  }
}

async function forgotPassword(req,res){
  const{email}= req.body;
  try {
    const checkUser = await User.findOne({email});
    if(!checkUser){
      return  res.status(400).json({success:false,message:`User does not exist`});
    }
    // generate a reset password token
    //send email to user
    const token =randomBytes(20).toString('hex');
    checkUser.resetPasswordToken= token;
    checkUser.resetPasswordTokenExpiresAt = Date.now() + 1*60*60*1000;
    await checkUser.save();
    //send use instructions email
    const resetURL = `${process.env.CLIENT_URL}/${token}`
    await forgotPasswordSender(resetURL,email)
    res.status(200).json({success:true,message:`If user exists and email will be sent, please follow the instructions to reset password`})
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:`Error finding email`})
  }
}

async function resetPassword(req,res) {
  const{password}= req.body;
  const token = req.params
  //need to generate a token for the endpoint
  //create a function to send email
  try {
    const checkUser = await User.findOne({resetPasswordToken:token.token,resetPasswordTokenExpiresAt:{$gt:Date.now()}});
    console.log(password)
    console.log(checkUser)
    if(!checkUser){
      return res.status(400).json({success:false,message:`Invalid token or expired token`})
    }

  
    const hashedPassword = await bcryptjs.hash(password,10);
    checkUser.password= hashedPassword;
    checkUser.resetPasswordToken= undefined;
    checkUser.resetPasswordTokenExpiresAt= undefined;
    await checkUser.save();
    //send email stating password was resetted
    await resetPasswordSuccessful(checkUser.email)
    res.status(200).json({success:true,message:`successfully resetted password`})
  } catch (error) {
    console.error(error);
     res.status(500).json({success:false,message:`Error resetting password`})
  }

}

async function checkAuth(req,res){

  try {
   
    console.log(req.userId)
    if(!req.userId){
      return res.status(401).json({success:false,message:`No userId found`})
    }
    const user= await User.findById(req.userId).select("-password");
    console.log(user)
    if(!user){
      return res.status(401).json({success:false, message:`Unauthorized, user not found`})
    }
    res.status(200).json({success:true,user:{...user._doc}})
  } catch (error) {
    console.error(error);
   return  res.status(500).json({success:false,message:`Error finding user: ${error.message}`})
  }
}
export {signup,login,logout,verifyUser,forgotPassword,resetPassword,checkAuth}