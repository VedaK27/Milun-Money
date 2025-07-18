import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

export const signup = async (req, res) => {
    const { username, email, password , upiId } = req.body;
    try {
        console.log("Signup request received:", req.body);
        const API_KEY = process.env.MAIL_API_KEY;

        // ✅ Check if API key exists
        if (!API_KEY) {
            return res.status(500).json({ success: false, message: "Email validation API key is missing." });
        }

        let isValidEmail = false; 

        try {
            const validEmail = await axios.get(`https://api.emailvalidation.io/v1/info?email=${email}&apikey=${API_KEY}`);
            if(validEmail.data.state !== 'deliverable') {
                isValidEmail = false;
            }else {
                isValidEmail = true;
            }
        } catch (error) {
            console.error("Email validation API error:", error.message);
            return res.status(500).json({ success: false, message: "Email validation service is down. Try again later." });
        }

        if (!isValidEmail) {
            return res.status(400).json({ success: false, message: "No such email exists!" });
        }

        // Check if user exists (by email or username)
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            username,
            email,
            upiId ,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT Token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in environment variables!");
        }
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        

        res.status(201).json({ success: true, message: "User registered successfully", token, user: newUser });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "Error in signup", error: error.message });
    }
};


export const login = async (req, res) => {
    console.log("Login Request Received:", req.body);
    
    const { emailOrUsername, password } = req.body;
    console.log("Checking User:", emailOrUsername);

    try {
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
        console.log("User Found:", user);

        if (!user) {
            console.log("User Not Found!");
            return res.status(400).json({ message: "User not found. Please sign up" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password Valid:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Invalid Password");
            return res.status(400).json({ message: "Invalid password! Please try again." });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log("Token Generated:", token);

        res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error in login", error: error.message });
    }
};
