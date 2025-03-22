import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './db/db.mjs';
import authRouter from './routes/auth_Routes.mjs'
dotenv.config();
connectDB()
const app = express();
app.use(cookieParser());
app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));

app.use('/api/auth',authRouter);

const PORT = process.env.PORT ||3001;

app.listen(PORT,()=>{
  console.log(`Listening to port: ${PORT}`)
})