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
      const userId = reservation.userId;
      const User = require('../../models/User');
      const user = await User.findById(userId);
      const email = user.email;
      const nodeMailer = require('nodemailer');
      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'borto2an5@gmail.com',
          pass: 'borto2an55555'
        }
      });
      const mailOptions = {
        from: 'borto2an5@gmail.com',
        to: email,
        subject: 'Cancelled reservation',
        text: 'Your reservation was successfully cancelled and '+reservation.price+' L.E. amount was sent to your credit card!!'
      };
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
      });
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
