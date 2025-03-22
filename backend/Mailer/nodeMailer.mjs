import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


//i got his info from https://www.nodemailer.com/about/
 export  const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:465,
  secure:true,
  auth:{
    user:process.env.USER,
    pass:process.env.PASS
  }
})