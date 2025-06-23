import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true,
    },
    tripDescription: {
        type: String,
    },
    tripAmount: {
        type: Number,
    },
    isFinished: {
        type: Boolean,
        default: false,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        default: [],
    }],

}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;