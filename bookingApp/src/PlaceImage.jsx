export default function PlaceImage({ place, idx = 0, className = null }) {
  if (!className) {
    className = "aspect-square object-cover rounded-lg";
  }

  // Guard against null / undefined place or photos to prevent runtime crash
  if (
    !place ||
    !Array.isArray(place.addedPhotos) ||
    place.addedPhotos.length === 0
  ) {
    return null; // nothing to render, keeps logic minimal
  }

  // Ensure idx is within bounds
  const safeIdx = idx < place.addedPhotos.length ? idx : 0;

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://bookingclone-backend-5pei.onrender.com";

  const current = place.addedPhotos[safeIdx];
  if (!current) return null;

  const photoURL = current.startsWith("uploads/")
    ? current
    : `uploads/${current}`;

  return (
    <div>
      <img className={className} src={`${baseURL}/${photoURL}`} alt="" />
    </div>
  );
}
