import { Router } from 'express';
import { createRestaurant, getAllRestaurants, getRestaurantById, getRestaurantByUserId } from '../controllers/restaurantController';

const router = Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.get('/rest/:userId', getRestaurantByUserId);

export default router;
