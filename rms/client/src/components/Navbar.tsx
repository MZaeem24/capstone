import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { getUser } from "@/utils/getUser";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = getUser();

  useEffect(() => {
    console.log("action happened");
  }, [dispatch]);

  return (
    <nav className="flex justify-between p-4 bg-primary-dark text-white">
      <h1 className="text-2xl font-bold">
        <a href="/">Restaurant System</a>
      </h1>
      <div className="flex space-x-6">
        {user !== null && user.role === "customer" && (
          <>
            <a href="/">Home</a>
            <a href="/restaurants">Restaurants</a>
            <a href="/recommendations">Recommendations</a>
            <a href="/customer-dashboard">Bookings</a>
          </>
        )}
        {user !== null && user.role === "restaurant" && (
          <>
            <a href="/">Home</a>
            <a href="/manage-vouchers">Vouchers</a>
            <a href="/dashboard">Details</a>
          </>
        )}
      </div>
      <div>
        {user !== null ? (
          <>
            <span>{`Welcome, ${user.name}`}</span>
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="ml-4 bg-red-500 py-1 px-2 rounded-sm"
            >
              <a href="/">Logout</a>
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="mr-4">
              Login
            </a>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
