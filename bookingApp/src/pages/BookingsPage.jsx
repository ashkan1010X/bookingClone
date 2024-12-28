import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlacePhotos from "../PlacePhotos";
import AddressLocation from "../AddressLocation";
import DatesnNights from "../DatesnNights";
import { format } from "date-fns";

export default function BookingsPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then(({ data }) => {
        const bookingFound = data.find((booking) => booking._id === id);
        if (bookingFound) {
          setBooking(bookingFound);
        }
      });
    }
  }, [id]);

  console.log(booking);

  if (!booking) {
    return (
      <div className="mt-4 bg-gray-100 mx-8 px-8 py-4 text-center">
        <p className="text-lg font-semibold">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 mx-8 px-8 py-6 rounded-xl shadow-lg">
      <h1 className="text-4xl text-white font-extrabold mb-6">
        {booking.place.title}
      </h1>

      {/* Address and Location */}
      <AddressLocation place={booking.place} />

      {/* Booking Summary */}
      <div className="bg-white p-6 mb-6 rounded-3xl shadow-xl">
        <h2 className="font-bold text-xl text-indigo-700 mb-3">
          Booking Summary:
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Guests:</strong> {booking.guests} people
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Check-in:</strong>{" "}
          {format(new Date(booking.checkIn), "yyyy-MM-dd")}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Check-out:</strong>{" "}
          {format(new Date(booking.checkOut), "yyyy-MM-dd")}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Total Price:</strong>{" "}
          <span className="text-green-600 font-semibold">${booking.price}</span>
        </p>
      </div>

      {/* Host Information */}
      <div className="bg-white p-6 mb-6 rounded-3xl shadow-xl">
        <h2 className="font-bold text-xl text-indigo-700 mb-3">
          Host Information:
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Host Name:</strong>{" "}
          {booking?.place.owner.name || "Host not available"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Contact Email:</strong>{" "}
          <a
            href={`mailto:${booking?.place.owner.email}`}
            className="text-blue-500 hover:underline"
          >
            {booking?.place.owner.email}
          </a>
        </p>
      </div>

      {/* Booking Information */}
      <div className="flex items-center justify-between bg-white p-6 mb-6 rounded-3xl shadow-xl hover:bg-gray-100 transition-all duration-300">
        <div>
          <h2 className="font-bold text-xl text-indigo-700 mb-2">
            Booking Information:
          </h2>
          <p className="text-gray-700">Confirmed for {booking.guests} guests</p>
        </div>
        <div className="flex flex-col items-end">
          <DatesnNights booking={booking} />
          <p className="mt-4 text-sm text-gray-600">
            Total Price:{" "}
            <span className="text-green-600 font-semibold">
              ${booking.price}
            </span>
          </p>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="bg-white p-6 mb-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-semibold text-indigo-700 mb-3">
          Place Amenities:
        </h3>
        <ul className="list-disc pl-5">
          {booking.place.perks.map((perk, index) => (
            <li key={index} className="text-gray-700">
              {perk}
            </li>
          ))}
        </ul>
      </div>

      {/* Place Photos */}
      <div className="mt-4">
        <h3 className="text-3xl font-semibold  text-black mb-3">
          Gallery of Your Stay{" "}
        </h3>
        <PlacePhotos place={booking.place} />
      </div>
    </div>
  );
}
