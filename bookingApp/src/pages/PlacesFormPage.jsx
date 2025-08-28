import { Navigate, useParams } from "react-router-dom";
import ImageUploader from "../ImageUploader";
import Perks from "../Perks";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckInNOut from "../CheckInNOut";
import provinceToCities from "../provinceToCities";

export default function PlacesFormPage() {
  const { id } = useParams();
  console.log({ id });
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState({
    Province: "",
    City: "",
    Street: "",
  });
  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [checkIn, setCheckIn] = useState({ Date: "", Time: "" });
  const [checkOut, setCheckOut] = useState({ Date: "", Time: "" });
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("100");
  const [redirect, setRedirect] = useState(false);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setDesc(data.desc);
      setPerks(data.perks);
      setAdditionalInfo(data.additionalInfo);
      setAddedPhotos(data.addedPhotos);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  useEffect(() => {
    if (address.Province) {
      setCities(provinceToCities[address.Province] || []);
    }
  }, [address.Province]);

  async function savePlace(e) {
    e.preventDefault();
    if (id) {
      await axios.put("/places", {
        id,
        title,
        address,
        addedPhotos,
        desc,
        perks,
        additionalInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      setRedirect(true);
    } else {
      await axios.post("/places", {
        title,
        address,
        addedPhotos,
        desc,
        perks,
        additionalInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="px-2">
      <form onSubmit={savePlace}>
        {/*Title*/}
        <h2 className="text-2xl mt-3">Title</h2>
        <input
          type="text"
          placeholder="e.g. Stylish Loft with a View"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Address */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address</h2>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4">
            <select
              value={address.Province}
              onChange={(e) =>
                setAddress({ Province: e.target.value, City: "", Street: "" })
              }
            >
              <option value="" disabled>
                Select Province
              </option>
              {Object.keys(provinceToCities).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>

            <select
              value={address.City}
              onChange={(e) => setAddress({ ...address, City: e.target.value })}
              disabled={!address.Province}
            >
              <option value="" disabled>
                Select City
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Street"
              value={address.Street}
              onChange={(e) =>
                setAddress({ ...address, Street: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/*Photos*/}
        <h2 className="text-2xl mt-3">Photos</h2>
        <ImageUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {/*Description*/}
        <h2 className="text-2xl mt-3">Description</h2>
        <textarea
          className="py-6"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/*Amenities*/}
        <h2 className="text-2xl mt-3">What’s Included in Your Stay</h2>
        <Perks perks={perks} setPerks={setPerks} />

        {/*Additional Info*/}
        <h2 className="text-2xl mt-3">Additional Details</h2>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />

        {/*Booking Details*/}
        <h2 className="text-2xl mt-3">Booking Details</h2>
        <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4">
          <CheckInNOut
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            select
            checkOut={checkOut}
            setCheckOut={setCheckOut}
          />
          {/*Max Guests*/}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Max Guests</h3>
            <input
              value={maxGuests}
              type="number"
              placeholder="Enter number of guests"
              className="mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>

          {/*Price*/}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Price per night</h3>
            <input
              value={price}
              type="number"
              placeholder="Enter price"
              className="mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
