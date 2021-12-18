const express = require("express");
const router = express.Router();
const Flight = require("../../models/Flight");
const authenticate = require("./Authentication");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

router.post("/create-session", async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode: 'payment',
            success_url: req.body.success_url,
            cancel_url: req.body.cancel_url,
            line_items: [
                getStripeDetailsFromFlight(req.body.departureFlight, "Departure Flight"),
                getStripeDetailsFromFlight(req.body.returnFlight, "Return Flight")
            ]
        });
        
        res.json({url: session.url});
    }catch(e){
        res.status(500).json(e);
    }

})

function getStripeDetailsFromFlight(flightDetails, flightName){
    return {
        quantity: 1,
        price_data:{
            currency: "egp",
            unit_amount: +(flightDetails.price)*100,
            product_data:{
                name: flightName
            }
        }
    }
}

module.exports = router;