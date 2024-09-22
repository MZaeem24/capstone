import React from "react";
import { useParams } from "react-router-dom";

interface BookingConfirmationProps {
  voucherCode?: string;
  timeRange?: string;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  voucherCode = "XXXX-XXXX",
  timeRange = "12pm - 1pm",
}) => {
  const { id } = useParams() || voucherCode;
  const { time } = useParams() || timeRange;

  return (
    <div className="p-4 bg-teal-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-teal-700 mb-4">
        Booking Confirmed
      </h1>
      <p className="text-lg">
        Your voucher code is:{" "}
        <span className="font-semibold">{id?.slice(0, 6)}</span>
      </p>
      <p className="text-lg">
        Valid for the following time range:{" "}
        <span className="font-semibold">{time}</span>
      </p>
    </div>
  );
};

export default BookingConfirmation;
