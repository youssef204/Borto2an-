// routes
const express = require("express");
const reservation_router = express.Router();
const Reservation = require("../../models/Reservation");
const authenticate = require("./Authentication");


//get reservations by access token
reservation_router.get("/", authenticate , function (req, res, next) {
  const queryObj = {userId: req.user.userId} ; 
  Reservation.find(queryObj)
    .populate('departureFlight.flightId')
    .populate('returnFlight.flightId')
    .then((reservation) =>{res.json(reservation)})
    .catch((err) => res.status(404).json({ msg: "No reservations are found" }));
});

deleteSeats = (flight, seats, cabinName) =>{
  const cabin = flight[cabinName+'Cabin'];
  cabin.takenSeats = cabin.takenSeats.filter(seat => !seats.includes(seat));
}

reservation_router.delete("/:id", authenticate , async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (reservation){
      res.send(reservation);

      const Flight = require("../../models/Flight");
      const departureFlight = await Flight.findById(reservation.departureFlight.flightId);
      const returnFlight = await Flight.findById(reservation.returnFlight.flightId);

      deleteSeats(departureFlight, reservation.departureFlight.seats, reservation.departureFlight.cabin);
      deleteSeats(returnFlight, reservation.returnFlight.seats, reservation.returnFlight.cabin);

      await departureFlight.save();
      await returnFlight.save(); 

      const userId = reservation.userId;
      const User = require('../../models/User');
      const user = await User.findById(userId);
      const email = user.email;
      const nodeMailer = require('nodemailer');
      const dotenv = require('dotenv');
      dotenv.config();
      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'borto2an5@gmail.com',
          pass: process.env.BORTO_PW
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

validateReservationFlights = (flight, seats, cabinName) =>{
  if(!flight || !seats || !cabinName)
    throw "error invalid data";

  const cabin = flight[cabinName+'Cabin'];
  for(let seat of seats)
    if(cabin.takenSeats.includes(seat))
      throw "there is a seat already taken in this flight";

  cabin.takenSeats = cabin.takenSeats.concat(seats);
}

reservation_router.post("/", authenticate , async (req, res) => {
  try{
    const reservation = req.body;
    if(!reservation|| ! ('departureFlight' in reservation) || ! ('returnFlight' in reservation) )
      throw "reservation not found in the request body";

    
    const User = require("./../../models/User");
    const user = await User.findById(reservation.userId);
    if(!user)
      throw "no such user exists";

    const Flight = require("../../models/Flight");

    const departureFlight = await Flight.findById(reservation.departureFlight.flightId);
    const returnFlight = await Flight.findById(reservation.returnFlight.flightId);

    validateReservationFlights(departureFlight, reservation.departureFlight.seats, reservation.departureFlight.cabin);
    validateReservationFlights(returnFlight, reservation.returnFlight.seats, reservation.returnFlight.cabin);

    await departureFlight.save();
    await returnFlight.save();

    Reservation.create(reservation)
    .then(result => {res.send(result);})
    .catch(err => {res.status(400).send(err)});
  }
  catch(e){
    res.status(400).send(e);
  }
});

module.exports = reservation_router;
