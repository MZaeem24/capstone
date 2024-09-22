import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/ResturantCard";
import { toast } from "react-toastify";
import { API_URL } from "@/api/api";
import { getUser } from "@/utils/getUser";
import { useNavigate } from "react-router-dom";

interface Restaurant {
  id: string;
  _id: string;
  name: string;
  address: string;
  cuisine: string[];
  menu: string[];
}

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const [cuisineFilter, setCuisineFilter] = useState<string>("");

  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "customer") {
      navigate("/");
    }
  }, []);

  // Fetch the list of restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`${API_URL}/restaurants`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data: Restaurant[] = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Error fetching restaurants", error);
    }
  };

  // Fetch restaurants when component mounts
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Filter restaurants based on search and cuisine
  const handleFilter = () => {
    let filtered = restaurants;

    if (search) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
          restaurant.address.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cuisineFilter) {
      filtered = filtered.filter((restaurant) =>
        restaurant.cuisine?.includes(cuisineFilter)
      );
    }

    setFilteredRestaurants(filtered);
  };

  // Run the filter function when search or cuisine changes
  useEffect(() => {
    handleFilter();
  }, [search, cuisineFilter, restaurants]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Restaurants Near You</h1>

      {/* Search and filter section */}
      <div className="mt-4 mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full"
        />

        <select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          className="border p-2 rounded-md w-full"
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Mexican">Mexican</option>
          {/* Add more cuisine options as needed */}
        </select>
      </div>

      {/* Render list of RestaurantCards based on the filtered data */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              name={restaurant.name}
              address={restaurant.address}
              cuisine={restaurant.cuisine}
              menu={restaurant.menu}
              id={restaurant._id}
            />
          ))
        ) : (
          <p>No restaurants found matching your criteria</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
