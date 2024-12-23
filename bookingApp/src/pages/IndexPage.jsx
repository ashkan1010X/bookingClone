import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces([...data]);
      console.log({ data });
    });
  }, []);
  return (
    <div className=" px-3 py-5 grid gap-6 gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
      {places.length > 0 &&
        places.map((place, idx) => (
          <Link
            to={"/place/" + place._id}
            key={idx}
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
            <h2 className="font-bold ">{place.address.City}</h2>
            <h3 className="text-sm truncate text-gray-800 ">{place.title}</h3>
            <div className="mt-1 ">
              <span className="font-bold">${place.price}/night</span>
            </div>
          </Link>
        ))}
    </div>
  );
}
