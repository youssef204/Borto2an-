// routes
const express = require('express');
const router = express.Router();


// router.get('/' , function(req,res){
//     mongo.connect(MONGODB_URI,function(err,db) {
//         var resultArray = [];
//         var cursor = db.collection("Flight").find(query);
//         cursor.forEach(function(err,doc) {
//               resultArray.push(doc);
//             }, function(){
//                 db.close();
//                 res.render('/' , {items:resultArray} )
//             });
//     })
//  }
// )


router.get('/', function (req, res, next) {

    var flight = req.db.get('Flight'),
        query = req.query;

    // convert year parameter string to int if it exists 
    if (query.hasOwnProperty("flightNumber")){
        query["flightNumber"] = parseInt(query.flightNumber);
    }
    if (query.hasOwnProperty("totalSeats")){
        query["totalSeats"] = parseInt(query.totalSeats);
    }
    if (query.hasOwnProperty("seatsAvailable")){
        query["seatsAvailable"] = parseInt(query.seatsAvailable);
    }
    if (query.hasOwnProperty("departureTime")){
        query["departureTime"] = parseInt(query.departureTime);
    }
    if (query.hasOwnProperty("arrivalTime")){
        query["arrivalTime"] = parseInt(query.flightNumber);
    }
    if (query.hasOwnProperty("duration")){
        query["duration"] = parseInt(query.duration);
    }
    if (query.hasOwnProperty("flightDate")){
        query["flightDate"] = parseInt(query.flightDate);    //parse to date
    }
    flight.find(query, function (err, docs) {
        res.json({length: docs.length, records: docs});    
    });
});
module.exports = router ;