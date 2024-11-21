import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      console.log({ data });
      setPlaces(data);
    });
  }, []);

  return (
    <div className="px-3">
      {console.log(places)} {/* Logs the places array on every render */}
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-2 bg-gradient-to-r from-purple-600 to-purple-900 rounded-full py-2 px-5 text-white transition-transform duration-200 hover:scale-105 shadow-md"
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
        <div className="mt-4">
          {places.length > 0 &&
            places.map((place, idx) => (
              <Link
                to={"/account/places/" + place._id}
                className="flex cursor-pointer border bg-gray-100 p-2 rounded-2xl gap-2"
                key={idx}
              >
                <div className="w-32 h-full bg-gray-300 grow-0 shrink-0">
                  {place.addedPhotos.length > 0 && (
                    <img
                      className="w-full h-full"
                      src={`http://localhost:5000/uploads/${place.addedPhotos[0]}`}
                      alt=""
                    />
                  )}{" "}
                </div>
                <div className="grow-0 shrink-0">
                  <h2 className="text-xl">{place.title} </h2>
                  <p className="">{place.desc}</p>
                  <p>{place.perks}</p>
                  <p>{place.checkIn.Date}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
