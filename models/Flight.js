// bare file to fill later with the schema of the db

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
    unique: true
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true
  },
  flightDate: {
    type: Date,
    required: true
  },
  economySeatsAvailable: {
    type: Number,
    required: true
  },
  businessSeatsAvailable: {
    type: Number,
    required: true
  },
  firstSeatsAvailable: {
    type: Number,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  airPort: {
    type: String,
    required: true
  },
  airline: {
    type : String,
    required : true
},
hasTransit: {
    type : Boolean,
    required : true
},
}, { timestamps: true });

const Flight = mongoose.model('Flight', FlightSchema);
module.exports = Flight;