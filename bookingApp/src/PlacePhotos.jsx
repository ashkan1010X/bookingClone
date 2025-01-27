import React, { useState } from "react";
import ModalImage from "./ModalImage";

export default function PlacePhotos({ place }) {
  const [showMorePhotos, setShowMorePhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://bookingclone-backend-5pei.onrender.com";

  if (showMorePhotos) {
    return (
      <div className="absolute inset-0 text-white z-50">
        <div className="bg-black p-8 grid gap-5">
          <h2 className="text-2xl">Photos of {place.title}</h2>
          <button
            onClick={() => setShowMorePhotos(false)}
            className="flex fixed right-12 top-8 gap-1 py-2 px-2 shadow-sm shadow-red-400 rounded-full bg-gradient-to-r from-purple-700 to bg-red-600 hover:bg-red-400"
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
            place.addedPhotos.map((photo) => {
              const photoURL = photo.startsWith("uploads/")
                ? photo
                : `uploads/${photo}`;
              return (
                <div key={photo} className="flex justify-center">
                  <img
                    className="w-[1400px] rounded-3xl"
                    src={`${baseURL}/${photoURL}`}
                    alt="error"
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        {place.addedPhotos.length > 0 && (
          <div>
            {(() => {
              const photoURL = place.addedPhotos[0].startsWith("uploads/")
                ? place.addedPhotos[0]
                : `uploads/${place.addedPhotos[0]}`;
              return (
                <img
                  className="cursor-pointer aspect-square object-cover h-[900px] w-full"
                  src={`${baseURL}/${photoURL}`}
                  alt=""
                  onClick={() => setSelectedImage(`${baseURL}/${photoURL}`)}
                />
              );
            })()}
          </div>
        )}

        <div className="grid">
          {place.addedPhotos.length > 1 &&
            (() => {
              const photoURL = place.addedPhotos[1].startsWith("uploads/")
                ? place.addedPhotos[1]
                : `uploads/${place.addedPhotos[1]}`;
              return (
                <img
                  className="cursor-pointer aspect-square object-cover h-[500px] w-full"
                  src={`${baseURL}/${photoURL}`}
                  alt=""
                  onClick={() => setSelectedImage(`${baseURL}/${photoURL}`)}
                />
              );
            })()}
          <div className="overflow-hidden">
            {place.addedPhotos.length > 2 &&
              (() => {
                const photoURL = place.addedPhotos[2].startsWith("uploads/")
                  ? place.addedPhotos[2]
                  : `uploads/${place.addedPhotos[2]}`;
                return (
                  <img
                    className="cursor-pointer aspect-square object-cover relative top-2 h-[400px] w-full"
                    src={`${baseURL}/${photoURL}`}
                    alt=""
                    onClick={() => setSelectedImage(`${baseURL}/${photoURL}`)}
                  />
                );
              })()}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowMorePhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-1 px-3 bg-gradient-to-r from-purple-400 to bg-red-500 rounded-3xl hover:bg-purple-400"
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

      {/* Modal for Selected Image */}
      <ModalImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
