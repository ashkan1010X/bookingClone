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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const INIT_FIELDS = [
      { id: "checkInDate", setter: setCheckIn, placeholder: "Check In" },
      { id: "checkOutDate", setter: setCheckOut, placeholder: "Check Out" },
      { id: "checkInDateMobile", setter: setCheckIn, placeholder: "Check In" },
      {
        id: "checkOutDateMobile",
        setter: setCheckOut,
        placeholder: "Check Out",
      },
    ];

    // Inject high z-index for calendar (once) so it's not hidden behind layout layers
    if (!document.getElementById("fp-zfix")) {
      const style = document.createElement("style");
      style.id = "fp-zfix";
      style.textContent =
        ".flatpickr-calendar{z-index:9999 !important;} .flatpickr-calendar.inline{z-index:9999 !important;}";
      document.head.appendChild(style);
    }

    const baseOptions = (setter, text) => ({
      dateFormat: "Y-m-d",
      allowInput: true,
      defaultDate: null,
      clickOpens: true,
      onReady: (_s, _d, inst) => {
        if (!inst.input.value) inst.input.placeholder = text;
      },
      onOpen: (_s, _d, inst) => {
        // keep placeholder visible while empty
        if (!inst.input.value) inst.input.placeholder = text;
      },
      onClose: (_s, _d, inst) => {
        if (!inst.input.value) inst.input.placeholder = text;
      },
      onValueUpdate: (_s, _d, inst) => {
        if (!inst.input.value) inst.input.placeholder = text;
      },
      onChange: (dates, _d, inst) => {
        setter(dates[0] ? dates[0].toISOString().split("T")[0] : "");
        if (!dates.length) inst.input.placeholder = text;
      },
    });

    const listeners = [];

    function attachPlaceholderHandlers(el, text) {
      const ensure = () => {
        if (!el.value) el.placeholder = text;
      };
      ["focus", "blur", "input", "change"].forEach((evt) => {
        const handler = () => ensure();
        el.addEventListener(evt, handler);
        listeners.push({ el, evt, handler });
      });
      // aggressive short window reassertion (covers flatpickr async overwrite)
      const start = Date.now();
      const interval = setInterval(() => {
        ensure();
        if (Date.now() - start > 400) clearInterval(interval);
      }, 60);
    }

    const observers = [];

    INIT_FIELDS.forEach(({ id, setter, placeholder }) => {
      const el = document.getElementById(id);
      if (el) {
        const fp = flatpickr(el, baseOptions(setter, placeholder));
        if (!el.value) el.placeholder = placeholder; // immediate
        attachPlaceholderHandlers(el, placeholder);
        // Force open on click (sometimes suppressed by styling wrappers)
        const clickHandler = () => {
          fp.open();
        };
        el.addEventListener("click", clickHandler);
        listeners.push({ el, evt: "click", handler: clickHandler });

        // MutationObserver to stop flatpickr from reverting placeholder to date format
        const observer = new MutationObserver(() => {
          if (!el.value && el.placeholder !== placeholder) {
            el.placeholder = placeholder;
          }
        });
        observer.observe(el, {
          attributes: true,
          attributeFilter: ["placeholder"],
        });
        observers.push(observer);
      }
    });

    // final micro-task & delayed pass
    queueMicrotask(() => {
      INIT_FIELDS.forEach(({ id, placeholder }) => {
        const el = document.getElementById(id);
        if (el && !el.value) el.placeholder = placeholder;
      });
    });
    const timeout = setTimeout(() => {
      INIT_FIELDS.forEach(({ id, placeholder }) => {
        const el = document.getElementById(id);
        if (el && !el.value) el.placeholder = placeholder;
      });
    }, 800);

    return () => {
      clearTimeout(timeout);
      listeners.forEach(({ el, evt, handler }) =>
        el.removeEventListener(evt, handler)
      );
      observers.forEach((o) => o.disconnect());
    };
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
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex justify-between items-center px-4 py-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg">
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
          <div className="relative w-full">
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
            {location && (
              <button
                onClick={() => setLocation("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-900 text-white px-1 text-sm  rounded-full shadow-md hover:bg-purple-900 transition duration-200"
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>

          <input
            id="checkInDate"
            type="text"
            value={checkIn}
            onChange={handleCheckInChange}
            className="flatpickr-checkin bg-transparent w-full min-w-[120px] px-4 py-2 text-white placeholder-white focus:outline-none"
            placeholder="Check In"
          />
          <input
            id="checkOutDate"
            type="text"
            value={checkOut}
            onChange={handleCheckOutChange}
            className="flatpickr-checkout bg-transparent w-full min-w-[120px] px-4 py-2 text-white placeholder-white focus:outline-none"
            placeholder="Check Out"
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
            <div className="absolute top-full mt-2 left-0 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg max-w-[30%] w-full z-20">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  onClick={() => handleLocationSelect(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-4 py-2 cursor-pointer text-purple-700 z-100 rounded-lg 
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

      {/* Mobile Header */}
      <header className="lg:hidden bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg">
        {/* Top bar with logo and menu button */}
        <div className="flex justify-between items-center px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-pink-300 transition-all duration-100"
            onClick={handleResetFields}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="font-extrabold text-xl tracking-wide">
              BooknGo
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to={user ? "/account" : "/login"}
              className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-2 px-3 shadow-lg hover:scale-105 transition-all duration-300 hover:text-yellow-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium hidden sm:block">
                {firstName || "Login"}
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 transition-all duration-200 focus:outline-none"
              aria-label="Toggle search menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-6 h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-45" : ""
                }`}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Collapsible search form */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 bg-white bg-opacity-10 backdrop-blur-lg">
            <div className="space-y-3">
              {/* Location Input */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1 text-white">
                  Where to?
                </label>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={location}
                  onChange={handleLocationChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  className="w-full px-4 py-3 bg-white bg-opacity-90 text-purple-900 placeholder-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-200"
                />
                {location && (
                  <button
                    onClick={() => setLocation("")}
                    className="absolute right-3 top-8 bg-purple-900 text-white px-2 py-1 text-xs rounded-full shadow-md hover:bg-purple-800 transition duration-200"
                    title="Clear"
                  >
                    ✕
                  </button>
                )}

                {/* Mobile suggestions dropdown */}
                {isFocused && suggestions.length > 0 && (
                  <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto z-30">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion}
                        onClick={() => handleLocationSelect(suggestion)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`px-4 py-3 cursor-pointer text-purple-700 border-b border-purple-100 last:border-b-0 ${
                          index === selectedIndex
                            ? "bg-purple-100"
                            : "hover:bg-purple-50"
                        }`}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Check-in and Check-out */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">
                    Check In
                  </label>
                  <input
                    id="checkInDateMobile"
                    type="text"
                    value={checkIn}
                    onChange={handleCheckInChange}
                    className="flatpickr-checkin w-full px-4 py-3 bg-white bg-opacity-90 text-purple-900 placeholder-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-200"
                    placeholder="Check In"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">
                    Check Out
                  </label>
                  <input
                    id="checkOutDateMobile"
                    type="text"
                    value={checkOut}
                    onChange={handleCheckOutChange}
                    className="flatpickr-checkout w-full px-4 py-3 bg-white bg-opacity-90 text-purple-900 placeholder-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-200"
                    placeholder="Check Out"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={() => {
                  handleSearch();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-medium flex items-center justify-center gap-2"
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
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
