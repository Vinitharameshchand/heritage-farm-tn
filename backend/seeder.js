import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Listing from './src/models/Listing.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({ email: { $ne: 'admin@heritagefarm.tn' } });
        await Listing.deleteMany({});

        // Create a dummy creator
        const creator = await User.create({
            name: 'Ramesh Farmer',
            email: 'ramesh@farm.tn',
            password: 'password123',
            role: 'creator'
        });

        const listings = [
            {
                creator: creator._id,
                title: 'Organic Turmeric Farm Tour',
                description: 'Join Ramesh in Erode for an authentic organic turmeric farming experience. Learn about processing and sustainable agriculture.',
                category: 'AgriRural',
                price: 1200,
                capacity: 10,
                duration: 180,
                difficulty: 'easy',
                location: { city: 'Erode', district: 'Erode', coordinates: [77.7172, 11.3410] },
                images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'],
                status: 'approved'
            },
            {
                creator: creator._id,
                title: 'Thanjavur Temple Heritage Walk',
                description: 'Explore the architectural marvels of the Big Temple with a local expert. Deep dive into Chola history and iconography.',
                category: 'HeritageCulture',
                price: 800,
                capacity: 15,
                duration: 120,
                difficulty: 'moderate',
                location: { city: 'Thanjavur', district: 'Thanjavur', coordinates: [79.1378, 10.7870] },
                images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800'],
                status: 'approved'
            },
            {
                creator: creator._id,
                title: 'Nilgiris Tea Trail Trek',
                description: 'Breathtaking trek through organic tea estates in Coonoor. Spot rare birds and enjoy freshly brewed tea at the summit.',
                category: 'EcoAdventure',
                price: 2500,
                capacity: 8,
                duration: 360,
                difficulty: 'hard',
                location: { city: 'Coonoor', district: 'Nilgiris', coordinates: [76.7806, 11.3530] },
                images: ['https://images.unsplash.com/photo-1597843796322-90f7d5663781?auto=format&fit=crop&q=80&w=800'],
                status: 'approved'
            }
        ];

        await Listing.insertMany(listings);
        console.log('✅ Seeding successful! Created 1 creator and 3 listings.');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
