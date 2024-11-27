import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationMarkerIcon } from "@heroicons/react/solid";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [showMorePhotos, setShowMorePhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/` + id).then(({ data }) => {
      console.log(data);
      setPlace(data);
    });
  }, [id]);

  if (!place) {
    return <p className="text-center mt-8 text-gray-500">No place found</p>;
  }
  if (showMorePhotos) {
    return (
      <div className="absolute inset-0  text-white">
        <div className="bg-black p-8 grid gap-4">
          <h2 className="text-2xl ">Photos of {place.title}</h2>
          <button
            onClick={() => setShowMorePhotos(false)}
            className="flex fixed right-12 top-8 gap-1 py-2 px-2 shadow-sm shadow-red-400 rounded-full bg-gradient-to-r from-purple-400 to bg-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close Photos
          </button>
          {place.addedPhotos.length > 0 &&
            place.addedPhotos.map((photo) => (
              <div key={photo} className="flex justify-center">
                <img
                  className="w-[1400px] rounded-3xl"
                  src={`http://localhost:5000/uploads/${photo}`}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 mx-8 px-8 py-4 ">
      <h1 className="text-3xl">{place.title}</h1>
      <div>
        <a
          className="flex gap-1.5 my-1 font-semibold underline"
          target="_blank"
          rel="noopener noreferrer"
          href={"https://maps.google.com/?q=" + place.address}
        >
          <LocationMarkerIcon className="h-6 w-6 text-blue-500" />
          {place.address}
        </a>
      </div>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div className="cursor-pointer">
            {place.addedPhotos.length > 0 && (
              <div>
                <img
                  className="aspect-square object-cover h-[900px] w-full"
                  src={`http://localhost:5000/uploads/${place.addedPhotos[0]}`}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.addedPhotos.length > 0 && (
              <img
                className="aspect-square object-cover  h-[500px] w-full"
                src={`http://localhost:5000/uploads/${place.addedPhotos[1]}`}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place.addedPhotos.length > 0 && (
                <img
                  className="aspect-square object-cover relative top-2  h-[400px] w-full"
                  src={`http://localhost:5000/uploads/${place.addedPhotos[2]}`}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowMorePhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-1 px-3 bg-opacity-75 bg-gradient-to-r from-purple-400 to bg-red-500 rounded-3xl shadow-md  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          More Photos
        </button>
      </div>

      <div className="my-4">
        <h2 className="font-semibold text-2xl">Description</h2>
        {place.desc}
      </div>
    </div>
  );
}
