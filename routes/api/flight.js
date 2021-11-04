// routes
const express = require("express");
const flight_router = express.Router();
const Flights = require("../../models/Flight");

//update flight
flight_router.put("/", (req, res) => {
  //console.log("in update");
  const id = req.body._id;
  const update = req.body.update;
  Flights.updateOne({ _id: id }, update).then(() => {
    console.log("done");
    res.send("done");
  });
});

module.exports = flight_router;
