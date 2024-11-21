const mongoose = require("mongoose")



const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  addedPhotos: [String],
  desc: String,
  perks: [String],
  additionalInfo: String,
  checkIn: {
    Date: String,
    Time: String
  },
  checkOut: {
    Date: String,
    Time: String
  },
  maxGuests: Number,
  price: Number,

});

const PlaceModel = mongoose.model("Place", placeSchema)

module.exports = PlaceModel