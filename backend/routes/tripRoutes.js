import express from 'express';
import { createTrip, getTrip, getAllTrips, getUserTrips, getTripMembers } from '../controller/tripController.js';

const router = express.Router();

router.post('/create', createTrip);
router.get('/:tripId', getTrip);
router.get('/', getAllTrips);
router.get('/users/:userId', getUserTrips);
router.get('/:tripId/members', getTripMembers);

export default router;