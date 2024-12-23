const mongoose = require("mongoose")



const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{9}$/.test(v); // Ensures number must be 9 digits
      },
      message: "Mobile number must be 9 digits long."
    }
  }, price: Number

});

const BookingModel = mongoose.model("Booking", bookingSchema)

module.exports = BookingModel