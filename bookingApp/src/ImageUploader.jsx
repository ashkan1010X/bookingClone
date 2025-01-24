import axios from "axios";
import { useState } from "react";
import ModalImage from "./ModalImage";

export default function ImageUploader({ addedPhotos, setAddedPhotos }) {
  const [photoLink, setPhotoLink] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/"
      : "https://bookingclone-backend-5pei.onrender.com";

  async function addPhoto(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/upload-link", { photoLink });
      setAddedPhotos([...addedPhotos, data]);
      setPhotoLink("");
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const fileData = new FormData();

    for (let i = 0; i < files.length; i++) {
      fileData.append("image", files[i]);
    }

    const { data } = await axios.post("/uploads", fileData, {
      headers: { "Content-type": "multipart/form-data" },
    });
    setAddedPhotos([...addedPhotos, ...data]);
  }

  function deletePhoto(img) {
    setAddedPhotos(addedPhotos.filter((photo) => photo !== img));
  }

  function thumbnailPhoto(img) {
    setAddedPhotos([img, ...addedPhotos.filter((photo) => photo !== img)]);
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Drop a photo link here for upload, e.g., yourplace.jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button onClick={addPhoto} className="bg-gray-200 px-4 rounded-2xl">
          Add Photo
        </button>
      </div>

      {/* Image Grid */}
      <div className="grid gap-3 grid-cols-3 mt-2 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo, idx) => {
            const imagePath = photo.startsWith("uploads/")
              ? photo
              : `uploads/${photo}`;
            return (
              <div className="relative" key={idx}>
                <img
                  className="aspect-square w-full object-cover rounded-xl"
                  src={`${baseURL}/${imagePath}`}
                  alt="Photo"
                  onClick={() =>
                    setSelectedImage(
                      `https://bookingclone-backend-5pei.onrender.com/uploads/${photo}`
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => deletePhoto(photo)}
                  className="absolute bottom-2 right-2 bg-opacity-0 rounded-2xl transition-transform transform hover:scale-110"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="gray"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 bg-gray-400 bg-opacity-0 rounded-2xl"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => thumbnailPhoto(photo)}
                  className="absolute top-2 right-2 bg-white bg-opacity-5 rounded-2xl transition duration-800"
                  title="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={photo === addedPhotos[0] ? "#FFFF00" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="w-10 h-10 rounded-2xl hover:fill-[#FFFF00] transition duration-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}

        {/* File Upload */}
        <label className="cursor-pointer flex items-center justify-center aspect-square gap-2 shadow hover:shadow-lg transition-shadow duration-200 bg-transparent rounded-2xl p-4 py-7">
          <input
            type="file"
            className="hidden"
            onChange={uploadPhoto}
            multiple
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </label>
      </div>

      {/* Modal for Selected Image */}
      <ModalImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
