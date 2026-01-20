import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Route files
import authRoutes from './src/routes/auth.routes.js';
import listingRoutes from './src/routes/listing.routes.js';

// Load env vars
dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Heritage Farm API' });
});

// Start Server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`⚡️ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    });
}

export default app;