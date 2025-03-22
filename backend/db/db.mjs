import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.mongoURI;


async function connectDB(){

  try {
    
    await mongoose.connect(connectionString);
    console.log(`Connected to mongo db via mongoos`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;