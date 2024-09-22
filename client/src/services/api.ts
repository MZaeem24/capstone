// src/services/api.ts
const API_URL = 'http://your-backend-api-url';

export const fetchRestaurants = async () => {
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  return await response.json();
};

export const registerUser = async (userData: unknown) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to register');
  return await response.json();
};
