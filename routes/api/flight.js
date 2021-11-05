// routes
const express = require('express');
const flight_router = express.Router();
const Flight = require('../../models/Flight');

flight_router.put("/", (req, res) => {
  //console.log("in update");
  const id = req.body._id;
  const update = req.body.update;
  Flights.updateOne({ _id: id }, update).then(() => {
    console.log("done");
    res.send("done");
  });
});

flight_router.get('/showAllflights', (req, res) => {
  Flight.find()
    .then(flight => {
      res.json(flight)
    })
    .catch(err => res.status(404).json({ msg: "No flights are found" }));
});

flight_router.post('/flights/create',(req, res) => {
    Flight.create(req.body);
});

module.exports = flight_router;