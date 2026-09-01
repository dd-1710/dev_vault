import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const SignUp = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || userName.length < 4) {
        return res.status(400).json({ error: 'Username must be at least 4 characters' })
    }
    if (!password || password.length < 4) {
        return res.status(400).json({ error: "Password must be at least 4 characters" })
    }

    const existingUser = await User.findOne({ userName })
    if (existingUser) {
        return res.status(400).json({ error: "User already exists!" })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "User Created Successfully !" })

    }
    catch (e) {
        return res.status(500).json({ message: "Something went wrong", error: e.message })
    }
}


export const Login = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || userName.length < 4) {
        return res.status(400).json({ error: "Username must be at least 4 characters" })
    }
    if (!password || password.length < 4) {
        return res.status(400).json({ error: "Password must be at least 4 characters" })
    }
    try {
        const existingUser = await User.findOne({ userName });
        if (!existingUser) {
            return res.status(400).json({ error: "User doesn't exists please sign up" })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials!" })
        }

        const refreshToken  = jwt.sign({id:existingUser._id,userName:existingUser.userName},process.env.JWT_REFRESH,{expiresIn:"7d"})
        
        const accessToken = jwt.sign(
            {id:existingUser._id,userName: existingUser.userName},process.env.JWT_SECRET,{expiresIn:"1h"})

        return res.status(200).json({ message: "User Logged-In Successfully!",accessToken:accessToken,refreshToken:refreshToken,userId:existingUser._id,userName: existingUser.userName })
    }
    catch (err) {
        return res.status(500).json({ message: "Unable to sign in", error:err.message })
    }

}
