import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const dbURI = process.env.MONGO_URI;

export const dbConnect = async () => {
    try {
        const db = await mongoose.connect(dbURI)
        console.log("DB is connected !!")
    }
    catch (err) {
        console.error("Unable to connect to DB!", err);
        process.exit(1);

    }
}