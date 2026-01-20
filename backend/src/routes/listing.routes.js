import express from 'express';
import {
    getListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
} from '../controllers/listing.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router
    .route('/')
    .get(getListings)
    .post(protect, authorize('creator', 'admin'), createListing);

router
    .route('/:id')
    .get(getListing)
    .put(protect, authorize('creator', 'admin'), updateListing)
    .delete(protect, authorize('creator', 'admin'), deleteListing);

export default router;
