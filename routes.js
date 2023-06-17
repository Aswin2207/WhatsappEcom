'use strict';
const router = require('express').Router();
const utils = require('./utils');
const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
const Whatsapp = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId,
    graphAPIVersion: 'v14.0'
});

router.get('/meta_wa_callbackurl', (req, res) => {
    try {
        console.log('GET: Someone is pinging me!');

        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];

        if (
            mode &&
            token &&
            mode === 'subscribe' &&
            process.env.Meta_WA_VerifyToken === token
        ) {
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    } catch (error) {
        console.error({ error })
        return res.sendStatus(500);
    }
});

router.get('/demo', (req, res) => {
    try {
        console.log('GET: Someone is pinging me!');
        return res.sendStatus(200);
    } catch (error) {
        console.error({ error })
        return res.sendStatus(500);
    }
});

router.post('/meta_wa_callbackurl', async (req, res) => {
    console.log("Message received")
    try {
        let data = Whatsapp.parseMessage(req.body);
        console.log(data)

        if (data?.isMessage) {
            let incomingMessage = data.message;
            let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
            let recipientName = incomingMessage.from.name;
            let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
            let message_id = incomingMessage.message_id; // extract the message id

            console.log(typeOfMsg);
            console.log(incomingMessage)
            if (typeOfMsg === 'text_message' && incomingMessage.text.body === 'Hi') {

                utils.firstMessage(recipientName, recipientPhone)
            }
            else if(typeOfMsg === 'text_message' && (incomingMessage.button_reply.id === 'English' || 'Maths')){
                utils.secondMessage(recipientName, recipientPhone,incomingMessage.button_reply.id)
            }
            else if(typeOfMsg === 'text_message' && (incomingMessage.button_reply.id === 'A' || 'B' || 'C')){
                utils.thirdMessage(recipientName, recipientPhone,incomingMessage.button_reply.id)
            }
            else if(typeOfMsg === 'text_message' && (incomingMessage.button_reply.id === '6pm' || '8pm' || '9pm')){
            }
            else{
                utils.fifthMessage(recipientName, recipientPhone,incomingMessage.simple_button_message.id)
            }
        }
        console.log('POST: Someone is pinging me!');
        // return res.sendStatus(200);
    } catch (error) {
        console.error({ error })
        return res.sendStatus(500);
    }
});


module.exports = router;