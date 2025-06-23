import mongoose from "mongoose";
import User from "../model/user.js";
import Trip from "../model/trip.js";
import dotenv from "dotenv";

dotenv.config();

export const createTrip = async (req, res) => {
    const { tripName, tripDescription, members } = req.body;
    try {
        const newTrip = new Trip({
            tripName,
            tripDescription,
            members,
        });
        const savedTrip = await newTrip.save();
        await User.updateMany(
            { _id: { $in: members } },
            { $push: { trips: savedTrip._id } }
        );
        res.status(201).json({ success: true, message: "Trip created successfully", trip: newTrip });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getTrip = async (req, res) => {
    const { tripId } = req.params;
    try {
        const trip = await Trip.findById(tripId).populate("members");
        if (!trip) {
            return res.status(404).json({ success: false, message: "Trip not found" });
        }
        res.status(200).json({ success: true, trip });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json({ success: true, trips });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// export const getUserTrips = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const trips = await Trip.find({ members: userId });
//         if (!trips) {
//             return res.status(404).json({ success: false, message: "No trips found for this user" });
//         }
//         res.status(200).json({ success: true, trips });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

// GET /api/users/:userId/trips
export const getUserTrips = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate("trips");
    //   const user = await User.findById(req.params.userId);

      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      res.status(200).json({ success: true, trips: user.trips });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

// // In tripController.js
// export const getUserTrips = async (req, res) => {
//     try {
//       const userId = req.params.userId;
//       const shouldPopulate = req.query.populate === 'members';
      
//       const query = Trip.find({ members: userId });
      
//       if (shouldPopulate) {
//         query.populate('members', 'username email _id');
//       }
      
//       const trips = await query.exec();
//       res.status(200).json(trips);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

// tripController.js
export const getTripMembers = async (req, res) => {
    try {
      const tripId = req.params.tripId;
      
      // Find the trip by ID and populate the members field
      const trip = await Trip.findById(tripId)
        .populate('members', 'username email _id upiId')
        .exec();
      
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
  
      // Return just the members array
      res.status(200).json(trip.members);
    } catch (error) {
      console.error('Error fetching trip members:', error);
      res.status(500).json({ message: error.message });
    }
  };