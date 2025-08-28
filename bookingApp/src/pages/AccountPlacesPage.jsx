import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPen } from "react-icons/fa";
import PlaceImage from "../PlaceImage";
import AccountPlacesSkeleton from "../components/skeletons/AccountPlacesSkeleton";

export default function AccountPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      console.log({ data });
      setPlaces(data);
      setLoading(false);
    });
  }, []);

  async function handleDelete(placeId) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (!isConfirmed) return;

    await axios.delete(`/user-places/${placeId}`);
    setPlaces([...places.filter((place) => place._id !== placeId)]);
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 min-h-screen">
        <AccountNav />
        <AccountPlacesSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-2 md:mx-8 py-4 md:py-8 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 min-h-screen">
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-3 bg-gradient-to-r from-purple-600 to-purple-900 rounded-full py-3 px-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.8}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Places
        </Link>

        {/* No Places Message */}
        {places.length === 0 && (
          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold mb-4">
              You haven’t added any places yet.
            </h2>
            <p className="text-gray-600 mb-6">
              Start sharing your unique spaces with guests from around the
              world. Add your first place today and make it available for
              bookings!
            </p>
          </div>
        )}

        <div className="mt-4 space-y-4">
          {places.length > 0 &&
            places.map((place, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-3 md:gap-5 p-4 bg-white rounded-2xl border-2 border-transparent shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-200"
              >
                {/* Place Image */}
                <div className="w-full md:w-48 md:grow-0 md:shrink-0">
                  <PlaceImage place={place} />
                </div>

                {/* Place Details */}
                <div className="flex flex-col w-full items-start">
                  <div className="flex justify-between items-start w-full mb-2">
                    <h2 className="text-lg md:text-2xl font-semibold text-gray-800 pr-2">
                      {place.title}
                    </h2>

                    {/* Edit and Delete Buttons - Mobile positioned in header */}
                    <div className="flex gap-2 md:hidden flex-shrink-0">
                      {/* Edit Button */}
                      <Link
                        to={"/account/places/" + place._id}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 shadow-lg transition-all duration-200"
                        title="Edit"
                      >
                        <FaPen className="w-3 h-3" />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(place._id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 shadow-lg transition-all duration-200"
                        title="Delete"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-left text-gray-600 mb-2 line-clamp-3">
                    {place.desc}
                  </p>

                  {/* Perks */}
                  <div className="w-full">
                    <p className="text-xs md:text-sm text-left flex flex-wrap gap-1">
                      <span className="font-semibold text-gray-700 underline decoration-yellow-400 decoration-4 mr-1">
                        Includes:
                      </span>
                      {place.perks.map((perk, idx) => (
                        <span
                          className="bg-red-200 text-black italic px-1.5 py-0.5 text-xs rounded-lg shadow hover:bg-red-300 transition duration-200 ease-in-out"
                          key={idx}
                        >
                          {perk}
                        </span>
                      ))}
                    </p>
                  </div>

                  <p className="text-sm md:text-md font-semibold text-gray-700 mt-2">
                    {place.checkIn?.Date}
                  </p>
                </div>

                {/* Edit and Delete Buttons - Desktop positioned on the right */}
                <div className="hidden md:flex gap-2 flex-col self-start">
                  {/* Edit Button */}
                  <Link
                    to={"/account/places/" + place._id}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 shadow-lg transition-all duration-200"
                    title="Edit"
                  >
                    <FaPen />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(place._id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 shadow-lg transition-all duration-200"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
