import React from "react";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  name: string;
  cuisine: string[];
  id: string;
  address: string;
  menu: string[];
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  address,
  cuisine,
  menu,
  id,
}) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p>Location: {address}</p>
      <p>Cuisines:{cuisine?.join(", ")}</p>

      <p>Menu: {menu?.join(", ")}</p>
      <Link to={`/restaurant/${id}`} className="text-primary">
        View Details
      </Link>
    </div>
  );
};

export default RestaurantCard;
