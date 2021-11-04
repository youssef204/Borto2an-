const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

router.post('/flights/create',(req, res) => {
    Flight.create(req.body);
});

module.exports = router;