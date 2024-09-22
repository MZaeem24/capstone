import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VoucherCard from "../components/VoucherCard";
import ReviewCard from "../components/ReviewCard";
import { API_URL } from "@/api/api";
import { getUser } from "@/utils/getUser";

interface Restaurant {
  _id: string;
  name: string;
  address: string;
  cuisine: string[];
  menu: string[];
}

interface Reviews {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  length: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
}

interface Voucher {
  _id: string;
  restaurantId: string;
  discountPercentage: number;
  timeRange: string;
  available: number;
  dateRange: string;
  daysAvailable: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  length: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
}

const RestaurantProfile = () => {
  const { id } = useParams(); // Get restaurant ID from the URL
  const [restaurant, setRestaurant] = useState<Restaurant>(); // State to store restaurant data
  const [vouchers, setVouchers] = useState<Voucher>(); // State to store restaurant data
  const [reviews, setReviews] = useState<Reviews>(); // State to store restaurant data

  const [error, setError] = useState(""); // State to handle errors

  const user = getUser();
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (user?.role !== "customer" && user?.role !== "restaurant") {
  //       navigate("/");
  //     }
  //   }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${API_URL}/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant data");
        }
        const data = await response.json();
        setRestaurant(data); // Set the restaurant data
      } catch (err) {
        console.error(err);
        setError("Failed to load restaurant data.");
      }
    };

    const fetchVouchers = async () => {
      try {
        const response = await fetch(`${API_URL}/vouchers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch voucher data");
        }
        const data = await response.json();
        setVouchers(data); // Set the restaurant data
      } catch (err) {
        console.error(err);
        setError("Failed to load voucher data.");
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews data");
        }
        const data = await response.json();
        setReviews(data); // Set the restaurant data
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews data.");
      }
    };

    fetchRestaurant();
    fetchVouchers();
    fetchReviews();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!restaurant) {
    return <p>Loading...</p>; // Show loading state while fetching
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>Cuisines: {restaurant.cuisine?.join(", ")}</p>

      <h2 className="text-xl font-bold mt-4">Menu</h2>
      {/* Render menu items here, assuming restaurant.menu is an array */}
      <ul>
        {restaurant.menu?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-4">Available Vouchers</h2>
      {vouchers?.length > 0 ? (
        vouchers?.map((voucher: Voucher) => (
          <div className="mb-2">
            <VoucherCard
              key={voucher._id}
              _id={voucher._id}
              restaurantId={voucher.restaurantId}
              discountPercentage={voucher.discountPercentage}
              timeRange={voucher.timeRange}
              dateRange={voucher.dateRange}
              daysAvailable={voucher.daysAvailable}
              available={voucher.available}
            />
          </div>
        ))
      ) : (
        <p>No Vouchers available for this Restaurant</p>
      )}

      <h2 className="text-xl font-bold mt-4">Customer Reviews</h2>
      {user?.role === "customer" && (
        <button className="bg-primary-dark rounded-sm py-1 px-2 text-white my-2">
          <Link to={`/submit-review/${id}`}>Add your review</Link>
        </button>
      )}
      {reviews?.length > 0 ? (
        reviews?.map((reviews: Reviews) => (
          <div className="mb-2">
            <ReviewCard
              key={reviews._id}
              _id={reviews._id}
              rating={reviews.rating}
              comment={reviews.comment}
              user={reviews.user.name}
            />
          </div>
        ))
      ) : (
        <p>No Reviews available for this Restaurant</p>
      )}
    </div>
  );
};

export default RestaurantProfile;
