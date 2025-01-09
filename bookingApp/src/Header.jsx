import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import provinceToCities from "./provinceToCities";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function Header() {
  const locationHook = useLocation();
  const city = new URLSearchParams(locationHook.search).get("city");
  const province = new URLSearchParams(locationHook.search).get("province");
  const checkInQuery = new URLSearchParams(locationHook.search).get("checkIn");
  const checkOutQuery = new URLSearchParams(locationHook.search).get(
    "checkOut"
  );

  const isValidCity = city && province;
  const initialLocation = isValidCity ? `${city}, ${province}` : "";
  const validCheckIn = checkInQuery || "";
  const validCheckOut = checkOutQuery || "";

  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState(validCheckIn);
  const [checkOut, setCheckOut] = useState(validCheckOut);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const firstName = user?.name?.split(" ")[0];

  const searchableLocations = Object.entries(provinceToCities).flatMap(
    ([province, cities]) => cities.map((city) => `${city}, ${province}`)
  );

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

  useEffect(() => {
    flatpickr("#checkInDate", {
      dateFormat: "Y-m-d",
      onChange: function (selectedDates) {
        setCheckIn(
          selectedDates[0] ? selectedDates[0].toISOString().split("T")[0] : ""
        );
      },
    });

    flatpickr("#checkOutDate", {
      dateFormat: "Y-m-d",
      onChange: function (selectedDates) {
        setCheckOut(
          selectedDates[0] ? selectedDates[0].toISOString().split("T")[0] : ""
        );
      },
    });
  }, []);

  function handleLocationSelect(selectedLocation) {
    const [city, province] = selectedLocation.split(", ");
    setLocation(`${city}, ${province}`);
    setSuggestions([]);
  }

  function handleNavigate() {
    let url = "/search?";
    const [city, province] = location.split(", ");

    if (city) url += `city=${city}`;
    if (province) url += `&province=${province}`;
    if (checkIn) url += `&checkIn=${checkIn}`;
    if (checkOut) url += `&checkOut=${checkOut}`;

    navigate(url);
  }

  function handleSearch() {
    handleNavigate();
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(suggestions.length - 1, prevIndex + 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else if (e.key === "Enter") {
      if (suggestions.length > 0 && selectedIndex >= 0) {
        handleLocationSelect(suggestions[selectedIndex]);
      } else if (location.trim() && suggestions.length === 0) {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const handleResetFields = () => {
    setLocation("");
    setCheckIn("");
    setCheckOut("");
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCheckInChange = (e) => {
    setCheckIn(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOut(e.target.value);
  };

  return (
    <header className="flex border justify-between items-center px-5 py-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg">
      <Link
        to="/"
        className="flex items-center gap-3 mr-2 text-white hover:text-pink-300 transition-all duration-100 rounded-lg"
        onClick={handleResetFields}
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

      <div className="relative gap-2 flex items-center bg-white bg-opacity-15 backdrop-blur-lg rounded-full p-3 w-full max-w-4xl shadow-md">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={handleLocationChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="bg-transparent w-full min-w-[300px] px-4 py-2 text-white placeholder-white focus:outline-none"
        />
        <input
          id="checkInDate"
          type="text"
          value={checkIn}
          onChange={handleCheckInChange}
          className="flatpickr-checkin bg-transparent w-full min-w-[120px] px-4 py-2 text-white placeholder-white focus:outline-none"
          placeholder="Select Check-In"
        />
        <input
          id="checkOutDate"
          type="text"
          value={checkOut}
          onChange={handleCheckOutChange}
          className="flatpickr-checkout bg-transparent w-full min-w-[120px] px-4 py-2 text-white placeholder-white focus:outline-none"
          placeholder="Select Check-Out"
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

        {isFocused && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 left-0 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg max-w-[30%] w-full z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                onClick={() => handleLocationSelect(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`px-4 py-2 cursor-pointer text-purple-700 z-50 rounded-lg 
          ${index === selectedIndex ? "bg-purple-300" : ""}`}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex ml-1 items-center gap-3 rounded-full py-2 px-5 bg-opacity-20 bg-white backdrop-blur-lg transition-all duration-100 hover:bg-opacity-30 shadow-md">
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
          <span className="font-medium">{firstName || "Login"}</span>
        </Link>
      </div>
    </header>
  );
}
