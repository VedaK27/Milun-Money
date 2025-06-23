import mongoose from "mongoose";

const individualPaymentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    category: {
        type: String,
        enum: ["Food", "Travel", "Accommodation", "Entertainment", "Education", "Other"],
        required: true,
    },
}, { timestamps: true });

const IndividualPayment = mongoose.model("IndividualPayment", individualPaymentSchema);
export default IndividualPayment;