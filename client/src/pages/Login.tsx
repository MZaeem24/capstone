import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { RootState } from "../store";
import { loginUser as apiLoginUser } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/utils/getUser";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const User = getUser(); // Retrieve user from localStorage or any utility function

  // Redirect if user is already logged in (both from Redux state or localStorage)
  useEffect(() => {
    if (user || User) {
      if (user?.role === "restaurant" || User?.role === "restaurant") {
        navigate("/dashboard");
      } else if (user?.role === "customer" || User?.role === "customer") {
        navigate("/customer-dashboard");
      }
    }
  }, [user, navigate, User]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiLoginUser(email, password);
      dispatch(setUser(response.data)); // Update Redux state with user data
      localStorage.setItem("token", response.data.token); // Save token in localStorage
      toast.success("Login successful!"); // Show success toast
      setError(""); // Clear previous error messages

      // Redirect based on user role after successful login
      if (response.data.role === "restaurant") {
        navigate("/dashboard");
      } else if (response.data.role === "customer") {
        navigate("/customer-dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
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
      <button
        type="submit"
        className="bg-teal-600 text-white rounded-md p-2 w-full"
      >
        Login
      </button>
      <ToastContainer />
    </form>
  );
};

export default Login;
