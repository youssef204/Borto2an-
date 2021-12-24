// routes
const express = require("express");
const reservation_router = express.Router();
const Reservation = require("../../models/Reservation");
const authenticate = require("./Authentication");
const Flight = require("../../models/Flight");

//get reservations by access token
reservation_router.get("/", authenticate , function (req, res, next) {
  const queryObj = {userId: req.user.userId} ; 
  Reservation.find(queryObj)
    .populate('departureFlight.flightId')
    .populate('returnFlight.flightId')
    .then((reservation) =>{res.json(reservation)})
    .catch((err) => res.status(404).json({ msg: "No reservations are found" }));
});

const sendEmail = async (userId, subject, body)=>{
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
    subject: subject,
    text: body

  };
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  });
}

reservation_router.get("/sendItinerary/:id", authenticate , async (req, res) => {
  try{
  const reservation = await Reservation.findById(req.params.id);
  const emailBody = 'This is an itinerary of your reservation sent upon your request.\n\n'+
  (await getEmailTextOfReservation(reservation))
  + "Thank you for choosing Borto2an!!";

  await sendEmail(reservation.userId, 'Reservation Itinerary',emailBody);
  res.send(reservation);
  }catch(e){
    res.status(400).send(e);
  }
});

deleteSeats = (flight, seats, cabinName) =>{
  const cabin = flight[cabinName+'Cabin'];
  cabin.takenSeats = cabin.takenSeats.filter(seat => !seats.includes(seat));
}

reservation_router.delete("/:id", authenticate , async (req, res) => {
  try {
    const reservation = await deleteReservation(req.params.id);
    if (reservation){
      res.send(reservation);
      const emailBody = 'Your reservation was successfully cancelled and '+reservation.price+' L.E. amount was sent to your credit card!!';

      await sendEmail(reservation.userId, 'Cancelled reservation', emailBody);
    }
    else
      res.status(404).json({ msg: `No Reservation with id ${req.params.id} found` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `${req.params.id} is not a correct id` });
  }
});

async function deleteReservation(reservationID){
  const reservation = await Reservation.findByIdAndDelete(reservationID);
  if (reservation){
    const departureFlight = await Flight.findById(reservation.departureFlight.flightId);
    const returnFlight = await Flight.findById(reservation.returnFlight.flightId);

    deleteSeats(departureFlight, reservation.departureFlight.seats, reservation.departureFlight.cabin);
    deleteSeats(returnFlight, reservation.returnFlight.seats, reservation.returnFlight.cabin);

    await departureFlight.save();
    await returnFlight.save();
  }
  return reservation;
}

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
    const {createdReservation} = await createReservation(reservation);

      const emailBody = 'Your reservation was successfully created and '+reservation.price+' L.E. was deducted from your credit card!!\n\n'+ (await getEmailTextOfReservation(reservation))
      + "Thank you for choosing Borto2an!!";

      await sendEmail(reservation.userId, 'Created Reservation', emailBody);
      res.send(createdReservation);
  }
  catch(e){
    res.status(400).send(e);
  }
});

async function createReservation(reservation){
  if(!reservation|| ! ('departureFlight' in reservation) || ! ('returnFlight' in reservation) )
      throw "reservation not found in the request body";
    
    const User = require("./../../models/User");
    const user = await User.findById(reservation.userId);
    if(!user)
      throw "no such user exists";

    const departureFlight = await Flight.findById(reservation.departureFlight.flightId);
    const returnFlight = await Flight.findById(reservation.returnFlight.flightId);

    validateReservationFlights(departureFlight, reservation.departureFlight.seats, reservation.departureFlight.cabin);
    validateReservationFlights(returnFlight, reservation.returnFlight.seats, reservation.returnFlight.cabin);

    await departureFlight.save();
    await returnFlight.save();
    const createdReservation = await Reservation.create(reservation);
    return {createdReservation, departureFlight, returnFlight};
}


reservation_router.put("/", authenticate , async (req, res) => {
  try{
    const {newReservation, oldReservation} = req.body;
    await deleteReservation(oldReservation._id);
    await createReservation(newReservation);
    await sendReservationUpdateEmail(newReservation, oldReservation);
    res.json({message:"reservation updated successfully"});
  }
  catch(e){
    res.status(400).send(e);
  }
});

async function sendReservationUpdateEmail(newReservation, oldReservation){
  const priceDiff = newReservation.price - oldReservation.price;
  let emailBody;
  if(priceDiff > 0)
    emailBody = 'Your reservation was successfully updated and '+ priceDiff +' L.E. was deducted from your credit card!!\n\n';
  else if(priceDiff < 0)
    emailBody = 'Your reservation was successfully updated and '+ (-priceDiff) +' L.E. was refunded to your credit card!!\n\n';
  else
    emailBody = 'Your reservation was successfully updated. There is no price difference.\n\n'

  emailBody += "New Reservation " + await getEmailTextOfReservation(newReservation)+ "\n" 
  + "Old Reservation "+ await getEmailTextOfReservation(oldReservation)+ "\n\n";
  + "Thank you for choosing Borto2an!!";

  await sendEmail(newReservation.userId, 'Reservation Updated', emailBody);
}

async function getEmailTextOfReservation(reservation){
  const departureFlight = await Flight.findById(reservation.departureFlight.flightId);
  const returnFlight = await Flight.findById(reservation.returnFlight.flightId);

  return ("Total Price is "+reservation.price+" L.E.\n" +
    "Departure Flight Details:\n"+
      "Flight Number: "+departureFlight.flightNumber+"\n"+
      "From: "+departureFlight.departure.airport+"\n"+
      "Airline: "+departureFlight.airline+'\n'+
      "Selected Seats: "+reservation.departureFlight.seats+"\n"+
      "Cabin: "+reservation.departureFlight.cabin+"\n\n"+

      "Return Flight Details:\n"+
      "Flight Number: "+returnFlight.flightNumber+"\n"+
      "To: "+returnFlight.departure.airport+"\n"+
      "Airline: "+returnFlight.airline+'\n'+
      "Selected Seats: "+reservation.returnFlight.seats+"\n"+
      "Cabin: "+reservation.returnFlight.cabin+"\n\n"+
      reservation.returnFlight.noAdults+" Adults & "+reservation.returnFlight.noChildren+" Children on the ticket"+"\n \n");
}
module.exports = reservation_router;
