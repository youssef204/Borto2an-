// routes
const express = require('express');
const router = express.Router();
const flight = require('../models/Flight');



router.get('/', function (req, res, next) {
   
   // var flight = req.db.get('Flight'),
     //   query = req.query;
    flight.find(req.query)
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({noFlightsFound : "No flights are found"}))
});
module.exports = router ;