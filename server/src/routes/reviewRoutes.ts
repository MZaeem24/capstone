import { Router } from 'express';
import { addReview, getRestaurantReviews } from '../controllers/reviewController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Route to get reviews for a restaurant
router.get('/:restaurantId', getRestaurantReviews);

// Route to add a review (requires authentication)
router.post('/:restaurantId', addReview);

export default router;
