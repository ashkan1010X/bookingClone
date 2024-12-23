import { LocationMarkerIcon } from "@heroicons/react/solid";

export default function AddressLocation({ place, className = null }) {
  if (!className) {
    className = "flex flex-col gap-2 my-3 text-lg";
  }
  className += " flex gap-2 my-1 font-semibold";

  const fullAddress = `${place.address.Province} ${place.address.City} ${place.address.Street}`;

  return (
    <a
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      href={"https://maps.google.com/?q=" + encodeURIComponent(fullAddress)}
    >
      <div className="flex items-center gap-2">
        <LocationMarkerIcon className="h-6 w-6 text-blue-500" />
        <div className="flex flex-col">
          <span>{place.address.Street}</span>
          <span>
            {place.address.City}, {place.address.Province}
          </span>
        </div>
      </div>
    </a>
  );
}
