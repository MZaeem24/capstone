import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (id: string, name: string, email: string, role: string) => {
  return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

// Register a new user (Customer/Restaurant)
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id.toString(), user.name.toString(), user.email.toString(), user.role.toString()); // Explicitly convert to string

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to register user' });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id.toString(), user.name.toString(), user.email.toString(), user.role.toString()); // Explicitly convert to string

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to log in' });
  }
};
