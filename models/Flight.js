const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CabinSchema = new Schema({
  takenSeats: {
    type: [Number],
    default: [],
  },
  adultPrice: {
    type: Number,
    required: true,
  },
  adultBaggage: { // max Weight in Kg
    type: Number,
    required: true,
  },
  childPrice: {
    type: Number,
    required: true,
  },
  childBaggage: { // max Weight in Kg
    type: Number,
    required: true,
  },
});

const FlightPointSchema = new Schema({
  airport: {
    type: String,
    required: true,
  },
  terminal: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const FlightSchema = new Schema(
  {
    flightNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    departure:{
      type: FlightPointSchema,
      required: true
    },
    arrival:{
      type: FlightPointSchema,
      required: true
    },
    airline: {
      type: String,
      required: true,
    },
    hasTransit: {
      type: Boolean,
      required: true,
    },
    airplaneModelID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AirplaneModel",
      required: true,
    },
    economyCabin: CabinSchema,
    businessCabin: CabinSchema,
    firstCabin: CabinSchema,
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;
