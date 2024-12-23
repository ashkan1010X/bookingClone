import { differenceInCalendarDays, format } from "date-fns";

export default function DatesnNights({ booking }) {
  return (
    <div className="mt-3 flex items-center text-gray-600 text-sm">
      <span className="flex items-center gap-1 bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md font-medium">
        📅 {format(new Date(booking.checkIn), "yyyy-MM-dd")}
      </span>
      <span className="mx-2 text-lg text-gray-800">⇄</span>
      <span className="flex items-center gap-1 bg-purple-100 text-purple-600 px-2 py-1 rounded-md font-medium">
        📅 {format(new Date(booking.checkOut), "yyyy-MM-dd")}
      </span>
      <span className="ml-3 text-sm font-medium bg-green-100 text-green-600 px-2 py-1 rounded-md">
        🌙{" "}
        {differenceInCalendarDays(
          new Date(booking.checkOut),
          new Date(booking.checkIn)
        )}{" "}
        nights
      </span>
    </div>
  );
}
