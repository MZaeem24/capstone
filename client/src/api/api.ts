// src/api.ts
import axios from 'axios';

export const API_URL = 'http://localhost:5000/api'; // Adjust this based on your backend URL

export const loginUser = async (email: string, password: string) => {
    return await axios.post(`${API_URL}/auth/login`, { email, password });
};

export const registerUser = async (name: string, email: string, password: string, role: string) => {
    return await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
};

// Add other API functions as needed
