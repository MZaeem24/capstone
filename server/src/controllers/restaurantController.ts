import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';

// Create a new restaurant
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create restaurant' });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch restaurants' });
  }
};

// Get single restaurant
export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch restaurant' });
  }
};

// Get single restaurant
export const getRestaurantByUserId = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ userId: req.params.userId });
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch restaurant' });
  }
};
