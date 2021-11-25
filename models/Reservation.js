// bare file to fill later with the schema of the db

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    departureFlight: {
      flightId: Number,
      seatNumbers: [Number],
      cabin: String,
      noAdults: Number,
      noChildren: Number
    },
    returnFlight: {
      flightId: Number,
      seatNumbers: [Number],
      cabin: String,
      noAdults: Number,
      noChildren: Number
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;
