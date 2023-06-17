'use strict';
const router = require('express').Router();
const utils = require('./utils');
const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
const Whatsapp = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId,
    graphAPIVersion: 'v13.0'
});

var status={step1:false,step2:false,step3:false,step4:false,step5:false}

var tutor;

router.get('/meta_wa_callbackurl', (req, res) => {
    try {
        console.log('GET: Someone is pinging me!');
        let data = Whatsapp.parseMessage(req.body);
        console.log(data)
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
    console.log("Message received");
    res.sendStatus(200)
    try {
        let data = Whatsapp.parseMessage(req.body);
        // console.log(data)
        if (data.isMessage) {
            let incomingMessage = data.message;
            let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
            let recipientName = incomingMessage.from.name;
            let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
            let message_id = incomingMessage.message_id; // extract the message id
            console.log(incomingMessage);
            console.log(status)
            if (typeOfMsg === 'text_message' && incomingMessage.text.body === 'Hi' && !status.step1) {
                console.log('step1')
                status.step1=true;

                utils.firstMessage(recipientName, recipientPhone)
            }
            else if(typeOfMsg === 'simple_button_message' && incomingMessage.button_reply.id === 'English' || 'Maths' && !status.step2){
                status.step2=true;
                console.log('step2')
                utils.secondMessage(recipientName, recipientPhone,incomingMessage.button_reply.id)
            }
            else if(typeOfMsg === 'simple_button_message' && incomingMessage.button_reply.id === 'A' || 'B' || 'C' && !status.step3){
                status.step3=true;
                console.log('step3')
                tutor=incomingMessage.button_reply.id;
                utils.thirdMessage(recipientName, recipientPhone,incomingMessage.button_reply.id)
            }
            else if(typeOfMsg === 'simple_button_message' && incomingMessage.button_reply.id === '6pm' || '8pm' || '9pm' && !status.step4){
                status.step4=true;
                console.log('step4')
                utils.fourthMessage(recipientName, recipientPhone,tutor,incomingMessage.button_reply.title)
            }
            else{
                if(!status.step5){
                    console.log('step5')
                status.step5=true;
                utils.fifthMessage(recipientName, recipientPhone,incomingMessage.button_reply.id);
                }
                if(incomingMessage.button_reply.id === 'No'){
                    status.step1=false;
                    status.step2=false;
                    status.step3=false;
                    status.step4=false;
                    status.step5=false;
                }
            }
        }
        // return res.sendStatus(200);
        // else{
        //    console.log("no msg")
        // console.log('POST: Someone is pinging me!');
        // }
    } catch (error) {
        console.error({ error })
        return res.sendStatus(200);
    }
});


module.exports = router;