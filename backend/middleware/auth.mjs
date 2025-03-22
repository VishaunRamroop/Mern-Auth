import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
export default async function authorize(req,res,next) {

const token = req.cookies.token;
// console.log(token)
if(!token){
return  res.status(401).json({success:false,message:`Invalid token`});
}
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.userId= decoded.userId;

    
  
    next()
  } catch (error) {
    console.error(error);
    res.status(401).json({success:false, message:`Server error,${error}`})
  }


}