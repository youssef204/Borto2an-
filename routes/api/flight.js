// routes
const express = require("express");
const flight_router = express.Router();
const Flights = require("../../models/Flight");
var qs = require('qs');

//update flight



flight_router.get('/', function (req, res, next) {
      const queryObj = { ...req.query };
      let queryStr = JSON.stringify(queryObj)
      const regex = /\b(gt|gte|lt|lte|in)\b/g;
      queryStr = queryStr.replace(regex, '$$' + "$1");
      console.log(JSON.parse(queryStr));
    Flights.find(JSON.parse(queryStr))
    .then(flight => res.json(flight))
    .catch(err => res.status(404).json({msg : "No flights are found"}))
});


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
