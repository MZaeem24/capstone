/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import VoucherCard from "../components/VoucherCard";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "@/api/api";
import { getUser } from "@/utils/getUser";
import { useNavigate } from "react-router-dom";

interface Voucher {
  _id: string;
  id: string;
  restaurantId: string;
  discountPercentage: number;
  timeRange: string;
  available: number;
  dateRange: { startDate: string; endDate: string };
  daysAvailable: string[];
}

interface Restaurant {
  _id: string;
}

const ManageVouchers: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [newVoucher, setNewVoucher] = useState<Voucher | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<{
    startTime: string;
    endTime: string;
  }>({
    startTime: "",
    endTime: "",
  });
  const [isEditing] = useState<boolean>(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "restaurant") {
      navigate("/");
    }
  }, []);

  const fetchRestaurant = async () => {
    const userId = getUser().id;
    try {
      const response = await fetch(`${API_URL}/restaurants/rest/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();
      setRestaurant(data);
    } catch (error: any) {
      toast.error("Error fetching restaurants", error);
    }
  };

  const fetchVouchers = async () => {
    try {
      const response = await fetch(`${API_URL}/vouchers/${restaurant?._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch vouchers");
      }
      const data = await response.json();
      setVouchers(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Error fetching vouchers", error);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  useEffect(() => {
    if (restaurant !== null) fetchVouchers();
  }, [restaurant]);

  const handleAddVoucher = async () => {
    const formattedTimeRange = `${timeRange.startTime} - ${timeRange.endTime}`;
    const formattedDateRange = `${newVoucher?.dateRange?.startDate} - ${newVoucher?.dateRange?.endDate}`;
    const addVoucher = {
      ...newVoucher,
      restaurantId: restaurant?._id,
      daysAvailable: selectedDays,
      timeRange: formattedTimeRange,
      dateRange: formattedDateRange,
    };

    try {
      const response = await fetch(`${API_URL}/vouchers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(addVoucher),
      });
      console.log(response);
      fetchRestaurant();
      if (!response.ok) {
        throw new Error("Failed to add voucher");
      }

      const data = await response.json();
      setVouchers([...vouchers, data]);
      toast.success("Voucher added successfully");
    } catch (error: any) {
      toast.error("Error adding voucher", error);
    }
  };

  const handleDaySelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = event.target.value;
    if (!selectedDays.includes(selectedDay)) {
      setSelectedDays([...selectedDays, selectedDay]);
    }
  };

  const removeDay = (day: string) => {
    setSelectedDays((prevDays) => prevDays.filter((d) => d !== day));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Vouchers</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {vouchers.length > 0 ? (
          vouchers.map((voucher) => (
            <VoucherCard
              key={voucher._id}
              discountPercentage={voucher.discountPercentage}
              timeRange={voucher.timeRange}
              available={voucher.available}
              daysAvailable={voucher.daysAvailable}
              dateRange={voucher.dateRange || { startDate: "", endDate: "" }}
              restaurantId={voucher.restaurantId}
              _id={voucher._id}
            />
          ))
        ) : (
          <p>No vouchers available</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">
          {isEditing ? "Edit Voucher" : "Add Voucher"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isEditing && newVoucher) {
              // handleEditVoucher(newVoucher._id);
            } else {
              handleAddVoucher();
            }
          }}
          className="mt-4"
        >
          <input
            type="number"
            placeholder="Discount Percentage (eg. 20)"
            value={newVoucher?.discountPercentage || ""}
            onChange={(e) =>
              setNewVoucher({
                ...newVoucher,
                discountPercentage: +e.target.value,
              })
            }
            className="border p-2 rounded-md w-full mb-4"
          />

          {/* Time Range Picker */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Select Time Range:</label>
            <div className="flex gap-4">
              <div>
                <label className="block mb-1">Start Time:</label>
                <input
                  type="time"
                  value={timeRange.startTime}
                  onChange={(e) =>
                    setTimeRange({ ...timeRange, startTime: e.target.value })
                  }
                  className="border p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1">End Time:</label>
                <input
                  type="time"
                  value={timeRange.endTime}
                  onChange={(e) =>
                    setTimeRange({ ...timeRange, endTime: e.target.value })
                  }
                  className="border p-2 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Date Range:</label>
            <input
              type="date"
              onChange={(e) =>
                setNewVoucher({
                  ...newVoucher,
                  dateRange: {
                    ...newVoucher?.dateRange,
                    startDate: e.target.value,
                  },
                })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="date"
              onChange={(e) =>
                setNewVoucher({
                  ...newVoucher,
                  dateRange: {
                    ...newVoucher?.dateRange,
                    endDate: e.target.value,
                  },
                })
              }
              className="border p-2 rounded-md w-full"
            />
          </div>

          {/* Available Days Dropdown */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Available Days:</label>
            <select
              value=""
              onChange={handleDaySelection}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select a day</option>
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Show selected days with delete option */}
          {selectedDays.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2">Selected Days:</h3>
              <div className="flex flex-wrap">
                {selectedDays.map((day, index) => (
                  <div
                    key={index}
                    className="bg-teal-200 text-teal-800 rounded-full px-3 py-1 m-1 flex items-center"
                  >
                    {day}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => removeDay(day)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            type="number"
            placeholder="Available Vouchers (eg. 50)"
            value={newVoucher?.available || ""}
            onChange={(e) =>
              setNewVoucher({ ...newVoucher, available: +e.target.value })
            }
            className="border p-2 rounded-md w-full mb-4"
          />
          <button
            type="submit"
            className="bg-primary-dark text-white py-2 px-4 rounded-md"
          >
            {isEditing ? "Update Voucher" : "Add Voucher"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageVouchers;
