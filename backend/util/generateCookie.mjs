import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


async function generateCookie(res,userId){

const token = jwt.sign({userId},process.env.JWT_SECRET,{
  expiresIn:'7d'
});

res.cookie('token',token,{
  httpOnly:true,// prevents xss attacks
  secure:process.env.NODE_ENV==='production',
  sameSite:'strict',//prevents csrf attacks
  maxAge:7*24*60*60*1000
})

return token;
}

export default generateCookie;