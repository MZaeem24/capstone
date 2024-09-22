import { Router } from 'express';
import { bookVoucher, getAvailableVouchers, getBookings } from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Route to get available vouchers based on filters like location and cuisine
router.get('/vouchers', getAvailableVouchers);
router.post('/', getBookings);

// Route to book a voucher (requires authentication)
router.post('/book/:restaurantId', bookVoucher);

export default router;
