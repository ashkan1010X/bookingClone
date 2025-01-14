export default function PlaceImage({ place, idx = 0, className = null }) {
  if (!className) {
    className = "aspect-square object-cover rounded-lg";
  }

  return (
    <div>
      <img
        className={className}
        src={`https://bookingclone-backend-5pei.onrender.com/uploads/${place.addedPhotos[idx]}`}
        alt=""
      />
    </div>
  );
}
