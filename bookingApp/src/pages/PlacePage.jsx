import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingInfo from "../BookingInfo";
import PlacePhotos from "../PlacePhotos.jsx";
import AddressLocation from "../AddressLocation.jsx";
import PlacePageSkeleton from "../components/skeletons/PlacePageSkeleton";

export default function PlacePage() {
  const { id } = useParams();
  console.log("asdasdasw", id);
  const [place, setPlace] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`/places/` + id).then(({ data }) => {
      setPlace(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <PlacePageSkeleton />;
  }

  if (!place) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-700">
        <h2 className="text-2xl font-bold">Place Not Found</h2>
        <p className="mt-4 max-w-md text-center text-gray-600">
          We couldn't find the place you were looking for. It may have been
          removed or is currently unavailable.
        </p>
        <a
          href="/"
          className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Go Back to Homepage
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-6 px-4 lg:px-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{place.title}</h1>

      {/* Hosted By Section */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            Hosted by
          </span>
          <span className="text-lg font-semibold text-gray-800">
            {place.owner.name}
          </span>
        </div>
      </div>

      <AddressLocation place={place} />

      <PlacePhotos place={place} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Description and Details */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Description
          </h2>
          <p className="text-gray-700 mb-6">{place.desc}</p>

          <div className="text-gray-700 space-y-2">
            <p>
              <span className="font-semibold">Check-In:</span>{" "}
              {place.checkIn.Date} @ {place.checkIn.Time}
            </p>
            <p>
              <span className="font-semibold">Check-Out:</span>{" "}
              {place.checkOut.Date} @ {place.checkOut.Time}
            </p>
            <p>
              <span className="font-semibold">Maximum Guests:</span>{" "}
              {place.maxGuests}
            </p>
          </div>

          {place.perks?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-gray-800">Perks</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {place.perks.map((perk, idx) => (
                  <li key={idx}>{perk}</li>
                ))}
              </ul>
            </div>
          )}

          {place.additionalInfo && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-gray-800">
                Additional Information
              </h3>
              <p className="text-gray-600 mt-2">{place.additionalInfo}</p>
            </div>
          )}
        </div>

        {/* Booking Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BookingInfo place={place} />
        </div>
      </div>
    </div>
  );
}
