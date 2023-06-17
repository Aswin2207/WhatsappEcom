const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
const Whatsapp = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId, 
    graphAPIVersion: 'v14.0'
});

exports.firstMessage = async (recipientName, recipientPhone) => {
await Whatsapp.sendSimpleButtons({
    message: `Hey ${recipientName}, \nYou are speaking to a chatbot.\nWhat do you want to do next?`,
    recipientPhone: recipientPhone, 
    listOfButtons: [
        {
            title: 'View some products',
            id: 'see_categories',
        },
        {
            title: 'Speak to a human',
            id: 'speak_to_human',
        },
    ],
});
}