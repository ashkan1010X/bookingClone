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
              key={idx}
              className="relative flex flex-col sm:flex-row sm:items-stretch gap-3 mt-3 bg-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:bg-gray-300"
            >
              {/* Image */}
              <div className="w-full sm:w-48 shrink-0">
                <PlaceImage place={booking.place} />
              </div>
              {/* Content */}
              <div className="flex flex-col w-full grow px-3 pb-3 sm:pr-5 sm:pb-4">
                {/* Title row with inline delete for mobile */}
                <div className="flex items-start gap-3 mt-2 sm:mt-3">
                  <h2 className="flex-1 text-xl sm:text-2xl font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors duration-300">
                    {booking?.place?.title}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(booking._id);
                    }}
                    className="sm:hidden shrink-0 p-2 -mr-1 mt-0.5 rounded-full text-gray-600 hover:text-red-700 hover:bg-red-100 active:scale-95 transition-all duration-200"
                    aria-label="Delete booking"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="mt-2 sm:mt-3">
                  <DatesnNights booking={booking} />
                </div>
                <div className="mt-2 sm:mt-4 text-gray-700">
                  <p className="text-base sm:text-lg">
                    <span className="text-green-600 font-bold">
                      Total Price: ${booking.price}
                    </span>
                  </p>
                </div>
              </div>
              {/* Desktop / tablet delete (kept overlay style) */}
              <div className="hidden sm:block absolute top-2 right-3 sm:top-3 sm:right-5 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(booking._id);
                  }}
                  className="text-black hover:text-red-700 transform hover:scale-110 transition-transform duration-200"
                  aria-label="Delete booking"
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
