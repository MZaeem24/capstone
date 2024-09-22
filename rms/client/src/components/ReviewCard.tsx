import React from "react";

interface ReivewCardProps {
  _id: string;
  comment: string;
  rating: number;
  user: string;
}

const ReviewCard: React.FC<ReivewCardProps> = ({
  // _id,
  comment,
  rating,
  user,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h4 className="font-semibold">{user}</h4>
      <p>
        Rating:{" "}
        {rating === 5
          ? "★★★★★"
          : rating === 4
          ? "★★★★☆"
          : rating === 3
          ? "★★★☆☆"
          : rating === 2
          ? "★★☆☆☆"
          : "★☆☆☆☆"}
      </p>
      <p>{comment}</p>
    </div>
  );
};

export default ReviewCard;
