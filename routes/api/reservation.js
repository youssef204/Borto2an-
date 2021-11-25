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

reservation_router.delete("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (reservation){
      res.send(reservation);
      // const userId = reservation.userId;
      // const User = require('../../models/User');
      // const user = User.find({_id:userId});
      // const email = user.email;
      // sendEmail(email);
    }
    else
      res.status(404).json({ msg: `No Reservation with id ${req.params.id} found` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `${req.params.id} is not a correct id` });
  }
});

reservation_router.post("/", async (req, res) => {
  Reservation.create(req.body)
  .then(result => {res.send(result);})
  .catch(err => {res.status(400).send(err)});
});

module.exports = reservation_router;
