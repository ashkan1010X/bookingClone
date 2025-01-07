import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const location = useLocation(); // Get the query parameter

  const cityQuery = new URLSearchParams(location.search).get("city");
  const provinceQuery = new URLSearchParams(location.search).get("province");
  const dateQuery = new URLSearchParams(location.search).get("date");
  const address = {
    Province: provinceQuery,
    City: cityQuery,
    checkIn: dateQuery,
  };

  useEffect(() => {
    axios.get("/places", { params: address }).then(({ data }) => {
      setPlaces(data);
    });
  }, [cityQuery, provinceQuery, dateQuery]);

  return (
    <div className="px-3 py-5 grid gap-6 gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 ? (
        places.map((place, idx) => (
          <Link
            to={"/place/" + place._id}
            key={place._id}
            className="hover:shadow-lg transition-all duration-200"
          >
            {place.addedPhotos.length > 0 && (
              <div className="flex">
                <img
                  className="cursor-pointer rounded-xl object-cover aspect-square hover:shadow-lg transition-shadow duration-100"
                  src={`http://localhost:5000/uploads/` + place.addedPhotos[0]}
                  alt=""
                />
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
            We couldn't find any matches at this time. Try adjusting your search
            criteria for more options.
          </p>
        </div>
      )}
    </div>
  );
}
