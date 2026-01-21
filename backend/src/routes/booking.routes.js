import express from 'express';
import {
    createBooking,
    getBookings,
    updateBookingStatus
} from '../controllers/booking.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router
    .route('/')
    .get(protect, getBookings)
    .post(protect, authorize('tourist'), createBooking);

router
    .route('/:id/status')
    .put(protect, authorize('creator', 'admin'), updateBookingStatus);

export default router;
