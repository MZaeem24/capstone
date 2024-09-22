import { API_URL } from "@/api/api";
import { getUser } from "@/utils/getUser";
import React from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast from react-toastify

interface VoucherCardProps {
  _id: string;
  restaurantId: string;
  discountPercentage: number;
  timeRange: string;
  available: number;
}

const VoucherCard: React.FC<VoucherCardProps> = ({
  _id,
  restaurantId,
  discountPercentage,
  timeRange,
  available,
}) => {
  const handleBookVoucher = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings/book/${restaurantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: getUser().id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error booking voucher");
      }
      toast.success("Voucher booked successfully!"); // Show success toast
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message); // Show error toast
    }
  };

  // Delete a voucher
  const handleDeleteVoucher = async () => {
    try {
      const response = await fetch(`${API_URL}/vouchers/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete voucher");
      }

      // setVouchers(vouchers.filter((voucher) => voucher._id !== _id));
      toast.success("Voucher deleted successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Error deleting voucher", error);
    }
  };

  return (
    <div className="bg-teal-100 p-4 rounded-md shadow-md w-full flex justify-between items-end">
      <div>
        <h4 className="font-semibold">{discountPercentage}% Off</h4>
        <p>Valid on all items</p>
        <p>Expiry: {timeRange}</p>
        <p>Available Vouchers: {available}</p>
      </div>
      {getUser().role === "customer" && (
        <button
          onClick={handleBookVoucher}
          className="bg-primary-dark text-white py-1 px-2 rounded-sm mt-2 cursor-pointer"
        >
          Book now
        </button>
      )}
      {getUser().role === "restaurant" && (
        <button
          onClick={handleDeleteVoucher}
          className="bg-red-600 text-white py-1 px-2 rounded-sm mt-2 cursor-pointer"
        >
          Delete
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default VoucherCard;
