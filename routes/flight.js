// routes
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight'); 
router.get('/',(req,res)=>{
    Flight.create(
        {
        from: 
            "Berlin"
          ,
          to:"Spain" 
           ,
          flightNumber: 1 ,
          flightDate: new Date("2/12/2022") ,
          departureTime: "12 PM" ,
          arrivalTime: "3 PM",
          seatsAvailable: 300 ,
          cabin: "Economy",
          totalSeats: 500 ,
          airplaneType: "" ,
          duration: 3 ,
          airline:"EgyptAir",
        hasTransit: true,
        } , (res=>{
            console.log("Flight Created in the Database ")
        })
        )
})
router.get('/showAllflights', (req, res) => {
    Flight.find()
      .then(flight => {
    //      console.log(flight); 
          res.json(flight)})
      .catch(err => res.status(404).json({msg:"No flights are found"}));
  });

  module.exports = router ; 