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
}

interface Restaurant {
  _id: string;
}

const ManageVouchers: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [newVoucher, setNewVoucher] = useState<Voucher | null>(null);
  const [isEditing] = useState<boolean>(false);

  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "restaurant") {
      navigate("/");
    }
  }, []);

  // Fetch restaurant from the API
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
      toast.error("Error fetching restaurants");
    }
  };

  // Fetch vouchers from the API
  const fetchVouchers = async () => {
    try {
      const response = await fetch(`${API_URL}/vouchers/${restaurant?._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch vouchers");
      }
      const data = await response.json();
      setVouchers(data);
    } catch (error) {
      toast.error("Error fetching vouchers");
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  useEffect(() => {
    if (restaurant !== null) fetchVouchers();
  }, [restaurant]);

  // Add a new voucher
  const handleAddVoucher = async () => {
    const addVoucher = { ...newVoucher, restaurantId: restaurant?._id };
    try {
      const response = await fetch(`${API_URL}/vouchers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
        },
        body: JSON.stringify(addVoucher),
      });
      fetchRestaurant();
      if (!response.ok) {
        throw new Error("Failed to add voucher");
      }

      const data = await response.json();
      setVouchers([...vouchers, data]);
      toast.success("Voucher added successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Error adding voucher", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Vouchers</h1>

      {/* Render list of vouchers */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {vouchers.length > 0 ? (
          vouchers.map((voucher) => (
            <VoucherCard
              key={voucher._id}
              discountPercentage={voucher.discountPercentage}
              timeRange={voucher.timeRange}
              available={voucher.available}
              restaurantId={voucher.restaurantId}
              _id={voucher._id}
            />
          ))
        ) : (
          <p>No vouchers available</p>
        )}
      </div>

      {/* Add/Edit Voucher form */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">
          {isEditing ? "Edit Voucher" : "Add Voucher"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isEditing && newVoucher) {
              handleEditVoucher(newVoucher._id);
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
          <input
            type="text"
            placeholder="Time Range (eg. 2024-12-27 or 2023-12-01T00:00:00Z-2023-12-31T23:59:59Z)"
            value={newVoucher?.timeRange || ""}
            onChange={(e) =>
              setNewVoucher({ ...newVoucher, timeRange: e.target.value })
            }
            className="border p-2 rounded-md w-full mb-4"
          />
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
