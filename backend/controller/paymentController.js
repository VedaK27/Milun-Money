import mongoose from "mongoose";
import User from "../model/user.js";
import Trip from "../model/trip.js";
import Payment from "../model/payments.js";
import UserPayment from "../model/userPayment.js";
import dotenv from "dotenv";

dotenv.config();

export const createPayment = async (req, res) => { 
    const { tripId, paidBy, splitAmong, totalAmount, category, date, description } = req.body;

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ success: false, message: "Trip not found" });
        }

        const payer = await User.findById(paidBy);
        if (!payer) {
            return res.status(404).json({ success: false, message: "PaidBy user not found" });
        }

        const validUsers = await User.find({ _id: { $in: splitAmong } });
        if (validUsers.length !== splitAmong.length) {
            return res.status(400).json({ success: false, message: "Some splitAmong users are invalid" });
        }

        const individualAmount = totalAmount / (splitAmong.length + 1);

        const newPayment = new Payment({
            tripId,
            paidBy,
            splitAmong,
            totalAmount,
            individualAmount,
            category,
            date,
            description
        });

        await newPayment.save();

        await Trip.findByIdAndUpdate(tripId, { $push: { payments: newPayment._id } });

        const ownerPayment = new UserPayment({
            myUser: paidBy,
            amount: individualAmount * splitAmong.length,
            description,
            date,
            paymentType: "Trip",
            tripId,
            tripName: trip.name,
            getFrom: splitAmong,
        });

        await ownerPayment.save();

        const memberPayments = splitAmong.map(userId => ({
            myUser: userId,
            amount: individualAmount,
            description,
            date,
            paymentType: "Trip",
            tripId,
            tripName: trip.name,
            payTo: paidBy,
        }));

        await UserPayment.insertMany(memberPayments);

        res.status(201).json({ 
            success: true, 
            message: "Payment created successfully", 
            payment: newPayment,
            ownerPayment,
            memberPayments
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTripPayments = async (req, res) => {
    const { tripId } = req.params;
    try {
        const payments = await Payment.find({ tripId });
        if (!payments) {
            return res.status(404).json({ success: false, message: "No payments found for this trip" });
        }
        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserToOwnerPayment = async (req, res) => {
    const { tripId, userId } = req.params;
    try {
        const payments = await Payment.find({ tripId, splitAmong: userId });
        if (!payments) {
            return res.status(404).json({ success: false, message: "No payments found for this user in this trip" });
        }
        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getFromMemberToUserPayment = async (req, res) => {
    const { tripId, userId } = req.params;
    try {
        const payments = await Payment.find({ tripId, paidBy: userId });
        if (!payments) {
            return res.status(404).json({ success: false, message: "No payments found for this user in this trip" });
        }
        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
