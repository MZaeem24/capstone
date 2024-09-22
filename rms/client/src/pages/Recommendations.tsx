import React, { useEffect, useState } from "react";
import VoucherCard from "../components/VoucherCard";
import { toast } from "react-toastify";
import { API_URL } from "@/api/api";
import { getUser } from "@/utils/getUser";
import { useNavigate } from "react-router-dom";

interface Voucher {
  _id: string;
  restaurantId: string;
  discountPercentage: number;
  timeRange: string;
  available: number;
  dateRange: string;
  daysAvailable: string[];
}

const Recommendations = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
  const [discountFilter, setDiscountFilter] = useState<string>("");
  const [timeRangeFilter, setTimeRangeFilter] = useState<string>("");

  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "customer") {
      navigate("/");
    }
  }, []);

  // Fetch the list of vouchers
  const fetchVouchers = async () => {
    try {
      const response = await fetch(`${API_URL}/vouchers`);
      if (!response.ok) {
        throw new Error("Failed to fetch vouchers");
      }
      const data: Voucher[] = await response.json();
      setVouchers(data);
      setFilteredVouchers(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Error fetching vouchers", error);
    }
  };

  // Fetch vouchers when component mounts
  useEffect(() => {
    fetchVouchers();
  }, []);

  // Filter vouchers based on discount percentage and time range
  const handleFilter = () => {
    let filtered = vouchers;

    if (discountFilter) {
      filtered = filtered.filter(
        (voucher) => voucher.discountPercentage >= parseInt(discountFilter)
      );
    }

    if (timeRangeFilter) {
      filtered = filtered.filter((voucher) =>
        voucher.timeRange.includes(timeRangeFilter)
      );
    }

    setFilteredVouchers(filtered);
  };

  // Run the filter function when filters change
  useEffect(() => {
    handleFilter();
  }, [discountFilter, timeRangeFilter, vouchers]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Available Vouchers</h1>

      {/* Filter section */}
      <div className="mt-4 mb-4 flex gap-4">
        <input
          type="number"
          placeholder="Min Discount %"
          value={discountFilter}
          onChange={(e) => setDiscountFilter(e.target.value)}
          className="border p-2 rounded-md w-full"
        />

        <input
          type="text"
          placeholder="Search by Time Range"
          value={timeRangeFilter}
          onChange={(e) => setTimeRangeFilter(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </div>

      {/* Render list of VoucherCards based on the filtered data */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredVouchers.length > 0 ? (
          filteredVouchers.map((voucher) => (
            <VoucherCard
              key={voucher._id}
              _id={voucher._id}
              discountPercentage={voucher.discountPercentage}
              timeRange={voucher.timeRange}
              available={voucher.available}
              restaurantId={voucher.restaurantId}
              daysAvailable={voucher.daysAvailable}
              dateRange={voucher.dateRange}
            />
          ))
        ) : (
          <p>No vouchers found matching your criteria</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
