import Listing from '../models/Listing.js';

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude from filtering
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Finding resource
        query = Listing.find(JSON.parse(queryStr)).populate('creator', 'name email');

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Listing.countDocuments(JSON.parse(queryStr));

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const listings = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: listings.length,
            pagination,
            data: listings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
export const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('creator', 'name email');

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.status(200).json({ success: true, data: listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private (Creator/Admin)
export const createListing = async (req, res) => {
    try {
        // Add user to req.body
        req.body.creator = req.user.id;

        // Check if user is creator or admin
        if (req.user.role !== 'creator' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only creators can add listings' });
        }

        const listing = await Listing.create(req.body);

        res.status(201).json({ success: true, data: listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private
export const updateListing = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Make sure user is listing owner
        if (listing.creator.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized to update this listing' });
        }

        listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private
export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Make sure user is listing owner
        if (listing.creator.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized to delete this listing' });
        }

        await listing.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
