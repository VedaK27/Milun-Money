import mongoose from "mongoose";

const userPaymentSchema = new mongoose.Schema({
    myUser: {
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
    complete: {
        type: Boolean,
        default: false,
    },
    paymentType: {
        type: String,
        enum: ["Individual", "Trip"],
        required: true,
    },
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: function() {
            return this.paymentType === "Trip";
        },
    },
    tripName: {
        type: String,
        required: function() {
            return this.paymentType === "Trip";
        },
    },
    payTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    getFrom: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, { timestamps: true });

const UserPayment = mongoose.model("UserPayment", userPaymentSchema);
export default UserPayment;