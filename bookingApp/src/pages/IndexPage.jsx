import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import CookieBanner from "../CookieBanner";
import DevelopmentBanner from "../DevelopmentBanner";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://bookingclone-backend-5pei.onrender.com";

  const cityQuery = new URLSearchParams(location.search).get("city");
  const provinceQuery = new URLSearchParams(location.search).get("province");
  const checkInQuery = new URLSearchParams(location.search).get("checkIn");
  const checkOutQuery = new URLSearchParams(location.search).get("checkOut");

  const placeInfo = {
    Province: provinceQuery,
    City: cityQuery,
    checkIn: checkInQuery,
    checkOut: checkOutQuery,
  };

  useEffect(() => {
    setLoading(true);
    axios.get("/places", { params: placeInfo }).then(({ data }) => {
      setPlaces(data);
      setLoading(false);
    });
  }, [cityQuery, provinceQuery, checkInQuery, checkOutQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-start pt-20 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 min-h-screen">
        <ClipLoader color="#6B46C1" loading={true} size={50} />
      </div>
    );
  }

  return (
    <div className="px-3 py-5">
      {/* Development Banner */}
      <DevelopmentBanner />

      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Available Listings
      </h1>
      <div className="grid gap-6 gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 ? (
          places.map((place) => (
            <Link
              to={"/place/" + place._id}
              key={place._id}
              className="hover:shadow-lg transition-all duration-200"
            >
              {place.addedPhotos.length > 0 && (
                <div className="flex">
                  {(() => {
                    const thumbnailPhoto = place.addedPhotos[0];
                    const photoURL = thumbnailPhoto.startsWith("uploads/")
                      ? thumbnailPhoto
                      : `uploads/${thumbnailPhoto}`;
                    return (
                      <img
                        className="cursor-pointer rounded-xl object-cover aspect-square hover:shadow-lg transition-shadow duration-100"
                        src={`${baseURL}/${photoURL}`}
                        alt={place.title}
                      />
                    );
                  })()}
                </div>
              )}
              <h2 className="font-bold">
                {place.address.City}, {place.address.Province}
              </h2>
              <h3 className="text-sm truncate text-gray-800">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}/night</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center mt-10 py-8 px-6 bg-gradient-to-r from-indigo-100 to-indigo-300 rounded-lg shadow-xl border-t-4 border-indigo-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No listings available for your selected location and dates.
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We couldn't find any matches at this time. Try adjusting your
              search criteria for more options.
            </p>
          </div>
        )}
      </div>
      <CookieBanner />
    </div>
  );
}
