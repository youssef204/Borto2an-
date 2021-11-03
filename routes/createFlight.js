const express = require('express');
const router = express.Router();

router.get('/flights/create',(req, res) => {
    const flightDetails = req.query;
});

module.exports = router;