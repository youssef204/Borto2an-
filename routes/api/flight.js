// routes
const express = require("express");
const flight_router = express.Router();
const Flight = require("../../models/Flight");
//var qs = require('qs');

//update flight
function storeTimeAsIs(dataTmp) {
  if("departure" in dataTmp)
    if('time' in dataTmp.departure && dataTmp.departure.time.charAt(dataTmp.departure.time.length-1)!='Z')
      dataTmp.departure.time += "Z";
  if("arrival" in dataTmp)
    if('time' in dataTmp.arrival && dataTmp.arrival.time.charAt(dataTmp.arrival.time.length-1)!='Z')
      dataTmp.arrival.time += "Z";
}


flight_router.get("/", function (req, res, next) {
  let queryObj = { ...req.query };
  let queryStr = JSON.stringify(queryObj);
  const regex = /\b(gt|gte|lt|lte|in)\b/g;
  queryStr = queryStr.replace(regex, "$$" + "$1");
  const query = JSON.parse(queryStr);

  if('departure.time' in query){
    const date = query['departure.time'];
    query['departure.time'] = {$gte: new Date(date),$lte: new Date(new Date(date).setHours(23,59,59))+'Z'};
  }

  if('arrival.time' in query){
    const date = query['arrival.time'];
    query['arrival.time'] = {$gte: new Date(date),$lte: new Date(new Date(date).setHours(23,59,59))+'Z'};
  }

  Flight.find(query)
    .populate('airplaneModelID')
    .then((flight) => res.json(flight))
    .catch((err) => res.status(404).json({ msg: "No flights are found" }));
});

flight_router.put("/", (req, res) => {
  const id = req.body._id;
  const update = req.body.update;
  storeTimeAsIs(update);
  Flight.findByIdAndUpdate(id,update)
  .then(() => {
    console.log("done");
    res.send("done");
  })
  .catch(err => res.status(400).send(err));
});

//read all flights
flight_router.get("/showAllflights", (req, res) => {
  Flight.find()
    .populate('airplaneModelID')
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

flight_router.post("/", async (req, res) => {
  let dataTmp = req.body;
  storeTimeAsIs(dataTmp);
  Flight.create(dataTmp)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});



module.exports = flight_router;
