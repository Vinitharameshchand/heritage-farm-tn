import express from 'express';
import upload from '../middlewares/upload.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// @desc    Upload multiple images
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.array('images', 5), (req, res) => {
    try {
        const urls = req.files.map(file => file.path);
        res.status(200).json({
            success: true,
            data: urls
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
