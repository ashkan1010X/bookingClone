export default function CheckInNOut({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) {
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Check-In Date</h3>
          <input
            value={checkIn.Date}
            type="date"
            onChange={(e) => setCheckIn({ Date: e.target.value, Time: "" })}
            className="mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Check-In Time</h3>
          <input
            value={checkIn.Time}
            type="time"
            onChange={(e) => setCheckIn({ ...checkIn, Time: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Check-Out Date</h3>
          <input
            value={checkOut.Date}
            type="date"
            onChange={(e) => setCheckOut({ Date: e.target.value, Time: "" })}
            className="mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Check-Out Time</h3>
          <input
            value={checkOut.Time}
            type="time"
            onChange={(e) => setCheckOut({ ...checkOut, Time: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>
    </div>
  );
}
