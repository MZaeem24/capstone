import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "@/api/api";
import { getUser } from "@/utils/getUser";
import { Link, useNavigate } from "react-router-dom";

interface Booking {
  _id: string;
  user: string;
  timeRange: string;
  restaurant: {
    id: string;
    userId: string;
    name: string;
    address: string;
    cuisine: string[];
    menu: string[];
  };
  voucher: {
    _id: string;
    restaurantId: string;
    discountPercentage: number;
    timeRange: string;
    dateRange: string;
    daysAvailable: string[];
    available: number;
  };
  status: string;
}

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "customer") {
      navigate("/");
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user: getUser().id }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data: Booking[] = await response.json();
      setBookings(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Error fetching bookings: " + error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Bookings</h1>
      <div className="mt-4">
        {bookings?.length > 0 ? (
          <ul>
            {bookings?.map((booking) => (
              <li key={booking?._id} className="mb-2 p-2 border rounded">
                <h2 className="font-semibold">{booking?.restaurant?.name}</h2>
                <p>Discount: {booking?.voucher?.discountPercentage} %</p>
                <p>Date: {booking?.voucher?.dateRange}</p>
                <p>Time: {booking?.timeRange}</p>
                <p>Days: {booking?.voucher?.daysAvailable.join(", ")}</p>
                <button className="bg-primary py-1 px-2 text-white cursor-pointer rounded-sm mt-2">
                  <Link
                    to={`/booking-confirmation/${booking?.voucher?._id}/${
                      booking?.timeRange
                    }/${
                      booking?.voucher?.dateRange
                    }/${booking?.voucher?.daysAvailable?.join(", ")}`}
                  >
                    View detail
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
