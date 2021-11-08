// bare file to fill later with the schema of the db

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlightSchema = new Schema(
  {
    flightNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    fromAirport: {
      type: String,
      required: true,
    },
    toAirport: {
      type: String,
      required: true,
    },
    fromTerminal: {
      type: Number,
      required: true,
    },
    toTerminal: {
      type: Number,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    economySeatsAvailable: {
      type: Number,
      required: true,
    },
    businessSeatsAvailable: {
      type: Number,
      required: true,
    },
    firstSeatsAvailable: {
      type: Number,
      required: true,
    },
    airline: {
      type: String,
      required: true,
    },
    hasTransit: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;
