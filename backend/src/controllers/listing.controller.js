import Listing from '../models/Listing.js';
import { translateObject, translateCategory, translateDifficulty, translateDistrict } from '../services/translation.service.js';

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude from filtering
        const removeFields = ['select', 'sort', 'page', 'limit', 'lang', 'language', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        const parsedQuery = JSON.parse(queryStr);

        // Advanced Search
        if (req.query.search) {
            parsedQuery.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { 'location.city': { $regex: req.query.search, $options: 'i' } },
                { 'location.district': { $regex: req.query.search, $options: 'i' } },
                { category: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Finding resource
        query = Listing.find(parsedQuery).populate('creator', 'name email');

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
        let listings = await query;

        // Dynamic translation if language parameter provided
        const targetLang = req.query.lang || req.query.language;
        if (targetLang && targetLang === 'ta') {
            listings = await Promise.all(listings.map(async (listing) => {
                const listingObj = listing.toObject();
                const translated = await translateObject(
                    listingObj,
                    ['title', 'description'],
                    targetLang
                );
                // Translate category display
                translated.categoryDisplay = translateCategory(listingObj.category, targetLang);
                // Translate difficulty
                translated.difficulty = translateDifficulty(listingObj.difficulty, targetLang);
                // Translate district
                if (translated.location?.district) {
                    translated.location.district = translateDistrict(listingObj.location.district, targetLang);
                }
                if (translated.location?.city) {
                    translated.location.city = translateDistrict(listingObj.location.city, targetLang);
                }
                return translated;
            }));
        } else {
            listings = listings.map(listing => {
                const listingObj = listing.toObject();
                listingObj.categoryDisplay = translateCategory(listingObj.category, 'en');
                return listingObj;
            });
        }

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

        let listingData = listing.toObject();
        
        // Dynamic translation if language parameter provided
        const targetLang = req.query.lang || req.query.language;
        if (targetLang && targetLang === 'ta') {
            listingData = await translateObject(
                listingData,
                ['title', 'description'],
                targetLang
            );
            // Translate inclusions if present
            if (listingData.inclusions && listingData.inclusions.length > 0) {
                listingData.inclusions = await Promise.all(
                    listingData.inclusions.map(inc => translateObject({ text: inc }, ['text'], targetLang).then(t => t.text))
                );
            }
            listingData.categoryDisplay = translateCategory(listingData.category, targetLang);
            listingData.difficulty = translateDifficulty(listingData.difficulty, targetLang);
            // Translate district and city
            if (listingData.location?.district) {
                listingData.location.district = translateDistrict(listingData.location.district, targetLang);
            }
            if (listingData.location?.city) {
                listingData.location.city = translateDistrict(listingData.location.city, targetLang);
            }
        } else {
            listingData.categoryDisplay = translateCategory(listingData.category, 'en');
            listingData.difficulty = translateDifficulty(listingData.difficulty, 'en');
            if (listingData.location?.district) {
                listingData.location.district = translateDistrict(listingData.location.district, 'en');
            }
            if (listingData.location?.city) {
                listingData.location.city = translateDistrict(listingData.location.city, 'en');
            }
        }

        res.status(200).json({ success: true, data: listingData });
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
