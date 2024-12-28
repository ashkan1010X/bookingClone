import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const location = useLocation(); // Get the query parameter

  const locationQuery = new URLSearchParams(location.search).get("location");

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      const filteredPlaces = locationQuery
        ? data.filter(
            (place) =>
              place.address.City.toLowerCase() === locationQuery.toLowerCase()
          )
        : data;

      setPlaces(filteredPlaces);
      console.log({ data });
    });
  }, [locationQuery]); // Trigger re-fetch when location changes

  return (
    <div className=" px-3 py-5 grid gap-6 gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
      {places.length > 0 &&
        places.map((place, idx) => (
          <Link
            to={"/place/" + place._id}
            key={place._id} // Use _id for a unique key
            className="hover:shadow-lg transition-all duration-200"
          >
            {place.addedPhotos.length > 0 && (
              <div className="flex ">
                <img
                  className="cursor-pointer rounded-xl object-cover aspect-square hover:shadow-lg transition-shadow duration-100 "
                  src={`http://localhost:5000/uploads/` + place.addedPhotos[0]}
                  alt=""
                />
              </div>
            )}
            <h2 className="font-bold ">
              {place.address.City}, {place.address.Province}{" "}
            </h2>
            <h3 className="text-sm truncate text-gray-800 ">{place.title}</h3>
            <div className="mt-1 ">
              <span className="font-bold">${place.price}/night</span>
            </div>
          </Link>
        ))}
    </div>
  );
}
