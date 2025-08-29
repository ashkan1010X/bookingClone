import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import PlaceImage from "../PlaceImage";
import { Link } from "react-router-dom";
import DatesnNights from "../DatesnNights";
import AccountBookingsSkeleton from "../components/skeletons/AccountBookingsSkeleton";

export default function AccountBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/bookings").then(({ data }) => {
      setBookings(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  async function handleDelete(bookingId) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (!isConfirmed) return;

    await axios.delete(`/user-bookings/${bookingId}`);
    setBookings(bookings.filter((booking) => booking._id !== bookingId));
  }

  return (
    <div className="px-5 py-8 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 min-h-screen">
      <AccountNav />
      <div className="px-4">
        {/* Content skeleton while loading */}
        {loading ? (
          <AccountBookingsSkeleton />
        ) : bookings?.length > 0 ? (
          bookings.map((booking, idx) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="relative flex gap-3 mt-3 bg-gray-200 rounded-3xl overflow-hidden border-transparent hover:shadow-lg transition-all duration-300 hover:bg-gray-300"
              key={idx}
            >
              <div className="w-48">
                <PlaceImage place={booking.place} />
              </div>
              <div className="flex-col w-full items-start overflow-hidden grow pr-3">
                {/* Title*/}
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                  {booking?.place?.title}
                </h2>
                {/* Date Range with Nights */}
                <DatesnNights booking={booking} />
                {/* Total Price */}
                <div className="mt-3 text-gray-700">
                  <p className="text-lg">
                    <span className="text-green-600 font-bold">
                      Total Price: ${booking.price}
                    </span>
                  </p>
                </div>
              </div>
              {/* Delete Button */}
              <div className="absolute top-3 right-5">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(booking._id);
                  }}
                  className="text-black rounded-lg hover:text-red-700 transform hover:scale-110 transition-transform duration-200"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 p-10 bg-gray-100 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Bookings Yet
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              You haven't made any bookings yet. Start exploring and book your
              next stay with us!
            </p>
            <Link
              to="/"
              className="mt-4 px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl hover:scale-105 transition-all duration-300"
            >
              Browse Listings
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
