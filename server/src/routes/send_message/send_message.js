//Importing the libraries
const express = require("express");
const router = express.Router();
//Importing import what is necessary for v
const accountSid = process.env.USER_TWILIO;
const authToken = process.env.TOKEN_TWILIO;
const client = require('twilio')(accountSid, authToken); 

router.post('/send_message', async(req, res) => {
    try {
        const { number, message } = req.body;

        const response = await client.messages.create({ 
            body: message, 
            from: 'whatsapp:+14155238886',       
            to: `whatsapp:+57${number}` 
        });
        console.log(response)
        res.json({msg: 'message sent successfully'})
        
    } catch (error) {
        res.status(500).json({msg: 'message not sent an error occurred'})
    }
})
module.exports = router;