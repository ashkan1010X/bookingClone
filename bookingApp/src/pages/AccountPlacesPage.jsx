import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPen } from "react-icons/fa";
import PlaceImage from "../PlaceImage";

export default function AccountPlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      console.log({ data });
      setPlaces(data);
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

  return (
    <div className="px-5 py-8 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 min-h-screen">
      {console.log(places)}
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

        <div className="mt-4">
          {places.length > 0 &&
            places.map((place, idx) => (
              <div
                key={idx}
                className="relative flex gap-5 my-4 p-4 bg-white rounded-2xl border-2 border-transparent shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-200"
              >
                {/* Place Image */}
                <div className="w-48 grow-0 shrink-0">
                  <PlaceImage place={place} />
                </div>

                {/* Place Details */}
                <div className=" flex flex-col w-full items-start overflow-hidden">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {place.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">{place.desc}</p>
                  <p className="text-sm text-gray-700">{place.perks}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    {place.checkIn?.Date}
                  </p>{" "}
                </div>

                {/* Edit and Delete Buttons */}
                <div className="absolute top-2 right-2 flex gap-2">
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
