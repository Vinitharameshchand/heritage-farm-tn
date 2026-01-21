import Booking from '../models/Booking.js';
import Listing from '../models/Listing.js';

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private (Tourist)
export const createBooking = async (req, res) => {
    try {
        const { listingId, startDate, endDate, numGuests } = req.body;

        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ success: false, message: 'Listing not found' });
        }

        // Calculate total price
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        const totalPrice = diffDays * listing.price * numGuests;

        const booking = await Booking.create({
            listing: listingId,
            user: req.user.id,
            creator: listing.creator,
            startDate,
            endDate,
            numGuests,
            totalPrice
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all bookings for logged in user
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res) => {
    try {
        let query;

        // If user is creator, show bookings for their listings
        if (req.user.role === 'creator') {
            query = Booking.find({ creator: req.user.id }).populate('listing user');
        } else if (req.user.role === 'admin') {
            query = Booking.find().populate('listing user creator');
        } else {
            // Tourist
            query = Booking.find({ user: req.user.id }).populate('listing creator');
        }

        const bookings = await query;

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Creator/Admin)
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Make sure user is the creator of the listing or admin
        if (booking.creator.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this booking' });
        }

        booking = await Booking.findByIdAndUpdate(req.params.id, { status }, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
