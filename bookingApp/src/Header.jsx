import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import provinceToCities from "./provinceToCities";

export default function Header() {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const firstName = user?.name?.split(" ")[0];

  const searchableLocations = Object.entries(provinceToCities).flatMap(
    ([province, cities]) => cities.map((city) => `${city}, ${province}`)
  );

  // Filter suggestions based on user input
  useEffect(() => {
    if (location.trim()) {
      const filteredSuggestions = searchableLocations.filter((loc) =>
        loc.toLowerCase().startsWith(location.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [location]);

  // Handle location selection with a delay to immediately clear the suggestions
  function handleLocationSelect(selectedLocation) {
    // Use a timeout to clear the suggestions after state updates
    setLocation(selectedLocation); // Update location input
    setTimeout(() => setSuggestions([]), 0); // Clear suggestions immediately
  }

  // Handle search button click
  function handleSearch() {
    if (location.trim()) {
      const [city, province] = location.split(", ");
      navigate(`/search?city=${city}&province=${province}`); // Navigate to search results
    }
  }

  function handleLogoClick() {
    setLocation(""); // Reset location input when logo is clicked
  }

  return (
    <header className="flex border justify-between items-center px-5 py-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg">
      {/* Logo and Brand Name */}
      <Link
        to="/"
        className="flex items-center gap-3 mr-2 text-white hover:text-pink-300 transition-all duration-100 rounded-lg"
        onClick={handleLogoClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10 animate-pulse"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="font-extrabold text-3xl tracking-wide">BooknGo</span>
      </Link>

      {/* Search Bar */}
      <div className="relative gap-2 flex items-center bg-white bg-opacity-15 backdrop-blur-lg rounded-full p-3 w-full max-w-2xl shadow-md">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent w-full max-w-[30%] px-4 py-2 text-white placeholder-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Dates"
          className="bg-transparent w-full max-w-[30%] px-4 py-2 text-white placeholder-white focus:outline-none"
        />
        <input
          type="number"
          placeholder="Guests"
          className="bg-transparent w-full max-w-[20%] px-4 py-2 text-white placeholder-white focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ml-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 left-0 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg max-w-[30%] w-full z-10">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                onClick={() => handleLocationSelect(suggestion)} // Clear suggestions on click
                className="px-4 py-2 hover:bg-purple-200 cursor-pointer text-purple-700"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="flex ml-1 items-center gap-3 rounded-full py-2 px-5 bg-opacity-20 bg-white backdrop-blur-lg transition-all duration-100 hover:bg-opacity-30 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-6 h-6 text-white hover:text-pink-300 transition-all duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-1 px-4 shadow-lg hover:scale-105 transition-all duration-300 hover:text-yellow-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
          {!!user && <span className="font-semibold">{firstName}</span>}
        </Link>
      </div>
    </header>
  );
}
