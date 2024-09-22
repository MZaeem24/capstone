import { API_URL } from "@/api/api";
import { getUser } from "@/utils/getUser";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import toast for notifications

const CreateRestaurant = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [cuisine, setCuisine] = useState<string[]>([]); // Array for multiple cuisines
  const [menu, setMenu] = useState<string[]>([]); // Array for multiple menu items
  const [error, setError] = useState<string>("");

  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "restaurant") {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Implement logic to send restaurant data to your backend API
    try {
      const response = await fetch(`${API_URL}/restaurants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: getUser().id,
          name,
          address,
          cuisine,
          menu,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create restaurant");
      }
      setError(""); // Clear any previous errors
      toast.success("Restaurant created successfully!"); // Success toast
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating restaurant:", err);
      setError("Failed to create restaurant. Please try again.");
      toast.error("Failed to create restaurant. Please try again."); // Error toast
    }
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Handle adding or removing cuisine from the array
    const selectedCuisine = e.target.value;
    if (selectedCuisine && !cuisine.includes(selectedCuisine)) {
      setCuisine([...cuisine, selectedCuisine]);
    }
  };

  const removeCuisine = (cuisineToRemove: string) => {
    setCuisine(cuisine.filter((c) => c !== cuisineToRemove));
  };

  const handleMenuItemChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Split the textarea value into an array of menu items
    setMenu(e.target.value.split("\n"));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Create Restaurant</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Restaurant Name */}
      <input
        type="text"
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-md p-2 w-full"
        required
      />

      {/* Restaurant Address */}
      <input
        type="text"
        placeholder="Restaurant Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border rounded-md p-2 w-full"
        required
      />

      {/* Cuisine Selection */}
      <div>
        <label htmlFor="cuisine" className="mr-2">
          Cuisine:
        </label>

        {/* Display selected cuisines as tags with remove option */}
        <div className="flex flex-wrap gap-2 mb-2">
          {cuisine.map((c) => (
            <span
              key={c}
              className="flex items-center bg-teal-600 text-white px-2 py-1 rounded-md"
            >
              {c}
              <button
                type="button"
                onClick={() => removeCuisine(c)}
                className="ml-2 text-white bg-red-500 rounded-full w-5 h-5 text-center"
              >
                x
              </button>
            </span>
          ))}
        </div>

        {/* Multi-select dropdown */}
        <select
          id="cuisine"
          onChange={handleCuisineChange}
          className="border rounded-md p-2 w-full"
        >
          <option value="">Select Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Japanese">Japanese</option>
          <option value="Thai">Thai</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
          <option value="Greek">Greek</option>
          <option value="Lebanese">Lebanese</option>
          <option value="Turkish">Turkish</option>
          <option value="Korean">Korean</option>
          <option value="Vietnamese">Vietnamese</option>
          <option value="Brazilian">Brazilian</option>
          <option value="Moroccan">Moroccan</option>
          <option value="Ethiopian">Ethiopian</option>
          <option value="Caribbean">Caribbean</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="German">German</option>
          <option value="Russian">Russian</option>
          <option value="Malaysian">Malaysian</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Filipino">Filipino</option>
          <option value="Peruvian">Peruvian</option>
          <option value="Argentinian">Argentinian</option>
        </select>
      </div>

      {/* Menu Items */}
      <label htmlFor="menu" className="mb-2">
        Menu Items (Add each item on a new line):
      </label>
      <textarea
        id="menu"
        value={menu.join("\n")} // Join menu items with newlines
        onChange={handleMenuItemChange} // Split by newlines on change
        className="border rounded-md p-2 w-full"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-teal-600 text-white rounded-md p-2 w-full"
      >
        Create Restaurant
      </button>
      <ToastContainer />
    </form>
  );
};

export default CreateRestaurant;
