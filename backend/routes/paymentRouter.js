import express from "express";
import { createPayment, getTripPayments, getUserToOwnerPayment, getFromMemberToUserPayment } from "../controller/paymentController.js";

const router = express.Router();

router.post("/create", createPayment);
router.get("/:tripId", getTripPayments);
router.get("/user/:tripId/:userId", getUserToOwnerPayment);
router.get("/from/:tripId/:userId", getFromMemberToUserPayment);

export default router;