import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingInfo({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let pricePerNight = 0;
  if (checkIn && checkOut) {
    pricePerNight = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookPlace() {
    const { data } = await axios.post("/bookingPlace", {
      checkIn,
      checkOut,
      guests,
      mobile,
      name,
      price: pricePerNight * place.price,
      place: place._id,
    });
    console.log(data);
    const bookingID = data._id;
    setRedirect("/account/bookings/" + bookingID);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-gray-100 shadow-lg rounded-xl p-6 max-w-md mx-auto">
      <div className="text-2xl font-semibold text-center mb-4">
        Price: <span className="text-purple-600">${place.price}</span>/night
      </div>
      <div className="border border-gray-300 rounded-xl p-4">
        {/* Date Inputs */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Check In:</label>
            <div className="relative">
              <input
                id="checkIn"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                style={{ color: checkIn ? "black" : "white" }}
              />
              <span
                onClick={() =>
                  document.getElementById("checkIn").showPicker?.()
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                📅
              </span>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Check Out:</label>
            <div className="relative">
              <input
                id="checkOut"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                style={{ color: checkOut ? "black" : "white" }}
              />
              <span
                onClick={() =>
                  document.getElementById("checkOut").showPicker?.()
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                📅
              </span>
            </div>
          </div>
        </div>

        {/* Guests Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Number of Guests:
          </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {/* Name & Contact Inputs */}
        {pricePerNight > 0 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Contact:</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  // Restrict mobile number to only 9 digits
                  if (/^\d{0,9}$/.test(e.target.value)) {
                    setMobile(e.target.value);
                  }
                }}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-italic"
                placeholder="(123)-452-6788"
                maxLength={9}
              />

              {!/^\d{9}$/.test(mobile) && mobile && (
                <div className="text-red-500 text-sm mt-2">
                  Mobile number must be 9 digits long.
                </div>
              )}
            </div>
          </>
        )}

        {/* Total Price */}
        {pricePerNight > 0 && (
          <div className="text-lg font-semibold text-center mt-4 bg-purple-100 text-purple-600 py-2 rounded-lg">
            Total: ${pricePerNight * place.price}
          </div>
        )}
      </div>

      {/* Book Now Button */}
      <button
        className={`w-full mt-6 text-white font-medium py-3 rounded-lg transition duration-300 ${
          !checkIn || !checkOut || !guests || !name || !mobile
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
        onClick={bookPlace}
        disabled={!checkIn || !checkOut || !guests || !name || !mobile}
      >
        Book Now
      </button>
    </div>
  );
}
