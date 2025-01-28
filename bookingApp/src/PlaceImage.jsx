export default function PlaceImage({ place, idx = 0, className = null }) {
  if (!className) {
    className = "aspect-square object-cover rounded-lg";
  }

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://bookingclone-backend-5pei.onrender.com";

  const photoURL = place.addedPhotos[idx].startsWith("uploads/")
    ? place.addedPhotos[idx]
    : `uploads/${place.addedPhotos[idx]}`;

  return (
    <div>
      <img className={className} src={`${baseURL}/${photoURL}`} alt="" />
    </div>
  );
}
