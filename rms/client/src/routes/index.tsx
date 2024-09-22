import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import RestaurantList from "../pages/RestaurantList";
import RestaurantProfile from "../pages/RestaurantProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ManageVouchers from "../pages/ManageVouchers";
import BookingConfirmation from "../pages/BookingConfirmation";
import CustomerDashboard from "../pages/CustomerDashboard";
import BookingHistory from "../pages/BookingHistory";
import ReviewSubmission from "../pages/ReviewSubmission";
import Recommendations from "../pages/Recommendations";
import CreateRestaurant from "@/pages/CreateRestaurant";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/restaurants", element: <RestaurantList /> },
  { path: "/restaurant/:id", element: <RestaurantProfile /> },
  { path: "/create-restaurant", element: <CreateRestaurant /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/manage-vouchers", element: <ManageVouchers /> },
  {
    path: "/booking-confirmation/:id/:time/:date/:days",
    element: <BookingConfirmation />,
  },
  { path: "/customer-dashboard", element: <CustomerDashboard /> },
  { path: "/booking-history", element: <BookingHistory /> },
  { path: "/submit-review/:id", element: <ReviewSubmission /> },
  { path: "/recommendations", element: <Recommendations /> },
  { path: "*", element: <h1>404 Page Not Found</h1> },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
