import express from "express";
import authRoutes from "./routes/auth.js";
import snippetRoutes from "./routes/snippet.js";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConfig.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
 
await dbConnect()
app.use(express.json());
app.use(cors())
app.use('/dev-vault/auth',authRoutes);
app.use('/dev-vault/snippet',snippetRoutes);

app.listen(port,()=>{
    console.log(`Started services on ${port}`)
})