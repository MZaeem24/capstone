import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import { API_URL } from "@/api/api"; // Import your API URL
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "@/utils/getUser";

const ReviewSubmission = () => {
  const { id } = useParams();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "customer") {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 0 || rating > 5) {
      toast.error("Rating must be between 0 and 5");
      return;
    }

    if (!comment.trim()) {
      toast.error("Review text cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: getUser().id,
          restaurant: id,
          rating,
          comment,
        }),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      navigate(`/restaurant/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 shadow-md bg-white"
    >
      <h1 className="text-2xl font-bold mb-4">Submit a Review</h1>
      <textarea
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        rows={5}
      />
      <input
        type="number"
        placeholder="Rating (0-5)"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        max={5}
        min={0}
        className="w-full p-2 border rounded-md mb-4"
      />
      <button
        type="submit"
        className="bg-primary-dark text-white py-2 px-4 rounded-md"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      <ToastContainer />
    </form>
  );
};

export default ReviewSubmission;
