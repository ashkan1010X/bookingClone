import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/` + id).then(({ data }) => {
      setPlace(data);
    });
  }, [id]);

  if (!place) {
    return <p className="text-center mt-8 text-gray-500">No place found</p>;
  }

  return (
    <div className="mt-4 bg-gray-100 mx-8 px-8 py-4 ">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="block my-1 font-semibold underline"
        target="_blank"
        rel="noopener noreferrer"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div>
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
    </div>
  );
}
