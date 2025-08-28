import { differenceInCalendarDays, format } from "date-fns";

export default function DatesnNights({ booking }) {
  return (
    <div className="mt-3 flex flex-col sm:flex-row sm:items-center text-gray-600 text-sm gap-2 sm:gap-0">
      <span className="flex items-center gap-1 bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md font-medium text-xs sm:text-sm">
        📅 {format(new Date(booking.checkIn), "yyyy-MM-dd")}
      </span>
      <span className="hidden sm:inline-block mx-2 text-lg text-gray-800">
        ⇄
      </span>
      <span className="flex items-center gap-1 bg-purple-100 text-purple-600 px-2 py-1 rounded-md font-medium text-xs sm:text-sm">
        📅 {format(new Date(booking.checkOut), "yyyy-MM-dd")}
      </span>
      <span className="sm:ml-3 text-xs sm:text-sm font-medium bg-green-100 text-green-600 px-2 py-1 rounded-md">
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
