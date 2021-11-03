const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

router.get('/flights/create',(req, res) => {
    const flightDetails = req.query;
});

module.exports = router;