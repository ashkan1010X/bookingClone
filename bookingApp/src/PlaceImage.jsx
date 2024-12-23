export default function PlaceImage({ place, idx = 0, className = null }) {
  if (!className) {
    className = "aspect-square object-cover rounded-lg";
  }

  return (
    <div>
      <img
        className={className}
        src={`http://localhost:5000/uploads/${place.addedPhotos[idx]}`}
        alt=""
      />
    </div>
  );
}
