const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirplaneModelScbema = new Schema(
  {
    name: {
        type: String,
        required: true,
      },
    economyRows: {
      type: Number,
      required: true,
    },
    economyColumns: {
      type: Number,
      required: true,
    },
    businessRows: {
      type: Number,
      required: true,
    },
    businessColumns: {
      type: Number,
      required: true,
    },
    firstClassRows: {
      type: Number,
      required: true,
    },
    firstClassColumns: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AirplaneModel = mongoose.model("AirplaneModel", AirplaneModelScbema);
module.exports = AirplaneModel;
