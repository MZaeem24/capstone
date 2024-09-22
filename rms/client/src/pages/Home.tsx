import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/ResturantCard";
import { API_URL } from "@/api/api";

interface Restaurant {
  _id: string;
  name: string;
  address: string;
  cuisine: string[];
  menu: string[];
}

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_URL}/restaurants`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">
        Welcome to the Restaurant Management System
      </h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            name={restaurant.name}
            address={restaurant.address}
            cuisine={restaurant.cuisine}
            menu={restaurant.menu}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
