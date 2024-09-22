import { Request, Response } from 'express';
import Voucher from '../models/voucher';

// Create voucher
export const createVoucher = async (req: Request, res: Response) => {
  try {
    const voucher = await Voucher.create(req.body);
    res.status(201).json(voucher);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create voucher' });
  }
};

export const getAllVouchers = async (req: Request, res: Response) => {
  try {
    // Fetch all vouchers from the database
    const vouchers = await Voucher.find();

    // If no vouchers found, return a 404 response
    if (!vouchers || vouchers.length === 0) {
      return res.status(404).json({ message: 'No vouchers found' });
    }

    // Return the fetched vouchers
    res.status(200).json(vouchers);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Error fetching vouchers' });
  }
};

// Get vouchers for restaurant
export const getVouchersByRestaurant = async (req: Request, res: Response) => {
  try {
    const vouchers = await Voucher.find({ restaurantId: req.params.restaurantId });
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch vouchers' });
  }
};

// Delete voucher by voucher ID
export const deleteVoucherById = async (req: Request, res: Response) => {
  try {
    const voucherId = req.params.id;

    // Find and delete the voucher by its _id
    const result = await Voucher.deleteOne({ _id: voucherId });

    if (!result.deletedCount) {
      return res.status(404).json({ error: 'Voucher not found' });
    }

    res.status(200).json({ message: 'Voucher deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete voucher' });
  }
};


