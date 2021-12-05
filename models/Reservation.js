// bare file to fill later with the schema of the db

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reservationFlightSchema = new Schema({
      flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        required: true
      },
      seats: {
        type:[Number],
        required: true
      },
      cabin: {
        type:String,
        required: true
      },
      noAdults: {
        type: Number,
        required: true
      },
      noChildren: {
        type:Number,
        required:true
      }
});

const ReservationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    departureFlight: {
      type: reservationFlightSchema,
      required: true
    },
    returnFlight: {
      type: reservationFlightSchema,
      required: true
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;
