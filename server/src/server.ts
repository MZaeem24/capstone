import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import voucherRoutes from './routes/voucherRoutes';
import bookingRoutes from './routes/bookingRoutes';
import reviewRoutes from './routes/reviewRoutes';
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`MongoDB connection error: ${err.message}`));

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
