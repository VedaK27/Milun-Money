import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true,
    },
    individualAmount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        enum: ["Food", "Travel", "Accommodation", "Entertainment", "Education", "Other"],
        required: true,
    },
    description: {
        type: String,
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    splitAmong: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isPaid: {
            type: Boolean,
            default: false,
        }
    }],    
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    userPayments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserPayment",
    }]
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;