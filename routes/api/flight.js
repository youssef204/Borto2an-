// routes
const express = require('express');
const flight_router = express.Router();
<<<<<<< HEAD
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


=======
const Flight = require('../../models/Flight');

>>>>>>> eab4844941ee4e7287236855ddbbfe31fd571ea6
flight_router.put("/", (req, res) => {
  //console.log("in update");
  const id = req.body._id;
  const update = req.body.update;
  Flight.updateOne({ _id: id }, update).then(() => {
    console.log("done");
    res.send("done");
  });
});

//read all flights
flight_router.get("/showAllflights", (req, res) => {
  Flight.find()
    .then((flight) => {
      res.json(flight);
    })
    .catch((err) => res.status(404).json({ msg: "No flights are found" }));
});

//delete flight with given ID
flight_router.delete("/:id", async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (flight) res.send(flight);
    else
      res.status(404).json({ msg: `No flight with id ${req.params.id} found` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `${req.params.id} is not a correct id` });
  }
});

flight_router.post('/',(req, res) => {
    Flight.create(req.body)
    .then((result)=>{res.send(result);})
    .catch((err)=>{console.log(err); res.status(400).send(err);
})});

module.exports = flight_router;