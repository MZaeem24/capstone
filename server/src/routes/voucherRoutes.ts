import { Router } from 'express';
import { createVoucher, getVouchersByRestaurant, deleteVoucherById, getAllVouchers } from '../controllers/voucherController';

const router = Router();

router.post('/', createVoucher);
router.get('/', getAllVouchers);
router.get('/:restaurantId', getVouchersByRestaurant);
router.delete('/:id', deleteVoucherById)

export default router;
