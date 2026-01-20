import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['AgriRural', 'HeritageCulture', 'EcoAdventure']
    },
    subcategory: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        city: String,
        district: String
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    capacity: {
        type: Number,
        required: [true, 'Please add capacity']
    },
    duration: {
        type: Number, // in minutes/hours
        required: [true, 'Please add duration']
    },
    difficulty: {
        type: String,
        enum: ['easy', 'moderate', 'hard'],
        default: 'easy'
    },
    images: [{
        type: String,
        default: 'no-photo.jpg'
    }],
    inclusions: [String],
    tags: [String],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
        default: 4.5
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Listing', listingSchema);
