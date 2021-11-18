// routes
const express = require("express");
const reservation_router = express.Router();
const Reservation = require("../../models/Reservation");



reservation_router.get("/", function (req, res, next) {
  const queryObj = { ...req.query };
  let queryStr = JSON.stringify(queryObj);
  const regex = /\b(gt|gte|lt|lte|in)\b/g;
  queryStr = queryStr.replace(regex, "$$" + "$1");
  Reservation.find(JSON.parse(queryStr))
    .then((reservation) => res.json(reservation))
    .catch((err) => res.status(404).json({ msg: "No reservations are found" }));
});

//read all flights
reservation_router.get("/showAllReservations", (req, res) => {
  Reservation.find()
    .then((reservation) => {
      res.json(reservation);
    })
    .catch((err) => res.status(404).json({ msg: "Reservations are found" }));
});

reservation_router.post("/", async (req, res) => {
  Reservation.create(req.body)
  .then(result => {res.send(result);})
  .catch(err => {res.status(400).send(err)});
});

module.exports = reservation_router;
