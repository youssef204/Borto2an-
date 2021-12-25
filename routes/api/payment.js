const express = require("express");
const router = express.Router();
const Flight = require("../../models/Flight");
const authenticate = require("./Authentication");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

/**
 * @swagger
 * /api/payment:
 *  post:
 *    description: Create a Stripe payment session for a given reservation. Reservation details is sent in the body of the request. The response contains the payment url where the user will be redirected to. 
 *    responses:
 *      '200':
 *        description: Payment session was created successfully. Session URL is in the response.
 *      '500':
 *        description: error in the request sent to the database
 */

router.post("/create-session", async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode: 'payment',
            success_url: req.body.success_url,
            cancel_url: req.body.cancel_url,
            line_items: [
                // getStripeDetailsFromFlight(req.body.departureFlight, "Departure Flight"),
                // getStripeDetailsFromFlight(req.body.returnFlight, "Return Flight")
                {
                    quantity: 1,
                    price_data:{
                        currency: "egp",
                        unit_amount: (+req.body.departureFlight.price + +req.body.returnFlight.price)*100,
                        product_data:{
                            name: "Reservation Price"
                        }
                    }
                }
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
            unit_amount: Math.max(0, +(flightDetails.price)*100),
            product_data:{
                name: flightName
            }
        }
    }
}

module.exports = router;