import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("database connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
};

export default connectDB;

