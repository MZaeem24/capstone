import { Request, Response } from 'express';
import Review from '../models/review';

// Add a review for a restaurant
export const addReview = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const { user, restaurant, rating, comment } = req.body;
  if (!user && restaurant) {
    return res.status(401).json({ error: 'Not authorized, user not found' });
  }

  try {
    // Ensure user has a booking for the restaurant before allowing review
    // Logic to check booking can be added here

    const review = await Review.create({
      user: user,
      restaurant: restaurant,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error adding review' });
  }
};

// Get reviews for a restaurant
export const getRestaurantReviews = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  try {
    const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'name');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};
