import mongoose from "mongoose";
import User from "../model/user.js";
import Trip from "../model/trip.js";
import Payment from "../model/payments.js";
import dotenv from "dotenv";
import IndividualPayment from "../model/indiviualPayment.js";

dotenv.config();


export const getIndividualPayments = async (req, res) => {
    try {
        const { userId } = req.params; // Extract user ID from URL params
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const payments = await IndividualPayment.find({ owner: userId }).sort({ date: -1 }); // Fetch and sort by latest payments
        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error("Error fetching user payments:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCompletedPayments = async (req, res) => {
    const { userId } = req.params;
    try {
        const payments = await Payment.find({ 
            splitAmong: { $elemMatch: { userId, isPaid: true } }  // Check if userId exists with isPaid true
        });
        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPendingPaymentsFromUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const payments = await Payment.find({ 
            splitAmong: { $elemMatch: { userId, isPaid: false } }  // Check if userId exists with isPaid false
        });
        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPendingPaymentsToUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const payments = await Payment.find({ 
            paidBy: userId,
            complete: false
        });
        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};