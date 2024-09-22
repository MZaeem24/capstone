import express from 'express';
import restaurantRoutes from './routes/restaurantRoutes';
import voucherRoutes from './routes/voucherRoutes';
import bookingRoutes from './routes/bookingRoutes';
import reviewRoutes from './routes/restaurantRoutes';
import authRoutes from './routes/authRoutes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

export default app;
