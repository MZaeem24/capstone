import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { RootState } from "../store";
import { registerUser as apiRegisterUser } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/utils/getUser";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const User = getUser(); // Retrieve user from localStorage or any utility function

  // Redirect if user is already logged in (both from Redux state or localStorage)
  useEffect(() => {
    if (user || User) {
      if (user?.role === "restaurant" || User?.role === "restaurant") {
        navigate("/create-restaurant");
      } else if (user?.role === "customer" || User?.role === "customer") {
        navigate("/customer-dashboard");
      }
    }
  }, [user, navigate, User]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiRegisterUser(name, email, password, role);
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
      toast.success("Registration successful!");
      setError("");
      if (response.data.role === "restaurant") {
        navigate("/create-restaurant");
      } else if (response.data.role === "customer") {
        navigate("/customer-dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Registration failed:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Registration failed. Please check your details.";
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-md p-2 w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-md p-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-md p-2 w-full"
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border rounded-md p-2 w-full"
        required
      >
        <option value="">Select Role</option>
        <option value="customer">Customer</option>
        <option value="restaurant">Restaurant</option>
      </select>
      <button
        type="submit"
        className="bg-teal-600 text-white rounded-md p-2 w-full"
      >
        Register
      </button>
      <ToastContainer />
    </form>
  );
};

export default Register;
