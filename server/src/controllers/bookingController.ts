import { Request, Response } from 'express';
import Booking from '../models/booking';
import Voucher from '../models/voucher';

// Get available vouchers based on filters like location, cuisine, and time range
export const getAvailableVouchers = async (req: Request, res: Response) => {
  const { location, cuisine, timeRange } = req.query;

  try {
    const vouchers = await Voucher.find({
      location,
      cuisine,
      timeRange,
      available: { $gt: 0 }, // Ensure that available vouchers are more than 0
    });

    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vouchers' });
  }
};

// Assuming you have a bookings model
export const getBookings = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const bookings = await Booking.find({ userId: userId }).populate('restaurant voucher');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};


// Book a voucher for a specific restaurant
export const bookVoucher = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { userId } = req.body;
  if (!userId) {
    return res.status(401).json({ error: 'Not authorized, user not found' });
  }

  try {
    const voucher = await Voucher.findById({ _id, available: { $gt: 0 } });

    if (!voucher) {
      return res.status(400).json({ error: 'No vouchers available' });
    }

    // Create a new booking
    const booking = await Booking.create({
      user: userId,
      restaurant: voucher.restaurantId,
      voucher: voucher._id,
      timeRange: voucher.timeRange,
    });

    // Decrease available voucher count
    voucher.available -= 1;
    await voucher.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error booking voucher' });
  }
};
