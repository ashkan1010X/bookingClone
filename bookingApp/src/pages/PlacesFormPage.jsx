import { Navigate, useParams } from "react-router-dom";
import ImageUploader from "../ImageUploader";
import Perks from "../Perks";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckInNOut from "../CheckInNOut";

export default function PlacesFormPage() {
  const { id } = useParams();
  // console.log({ id });

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [checkIn, setCheckIn] = useState({ Date: "", Time: "" });
  const [checkOut, setCheckOut] = useState({ Date: "", Time: "" });
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("100");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      console.log(data);
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

  async function savePlace(e) {
    e.preventDefault();
    if (id) {
      console.log(id);
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
      // creates a new pace
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
        <p className="text-gray-500 text-sm">
          Give your place a name that stands out!
        </p>
        <input
          type="text"
          placeholder="e.g. Stylish Loft with a View"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/*Address*/}
        <h2 className="text-2xl mt-3 text sm">Address</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/*Photos*/}
        <h2 className="text-2xl mt-3 text sm">Photos </h2>
        <p className="text-gray-500 text-sm">More Images, More Interest! </p>
        <ImageUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {/*Description*/}
        <h2 className="text-2xl mt-3">Description</h2>
        <p className="text-gray-500">
          Provide the exciting details of your place
        </p>
        <textarea
          className="py-6"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/*Ameneties*/}
        <h2 className="text-2xl mt-3">What’s Included in Your Stay</h2>
        <p className="text-gray-500">
          List the features your place would provide
        </p>
        <Perks perks={perks} setPerks={setPerks} />

        {/*Additional Info*/}
        <h2 className="text-2xl mt-3">Additional Details</h2>
        <p className="text-gray-500 text-sm">Essential Guidelines </p>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
        <h2 className="text-2xl mt-3">Booking Details</h2>
        <p className="text-gray-500 mt-1">
          Please provide the following information to complete your booking:
        </p>
        <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4">
          <CheckInNOut
            checkIn={checkIn}
            setCheckIn={setCheckIn}
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
              placeholder="Enter number of guests"
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
