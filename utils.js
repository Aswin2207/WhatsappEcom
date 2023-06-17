const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
const Whatsapp = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId, 
    graphAPIVersion: 'v14.0'
});

exports.firstMessage = async (recipientName, recipientPhone) => {
await Whatsapp.sendSimpleButtons({
    message: `Which course/subject do you want to book?`,
    recipientPhone: recipientPhone, 
    listOfButtons: [
        {
            title: 'English',
            value: 'English',
        },
        {
            title: 'Maths',
            value: 'Maths',
        },
    ],
}).catch(error=>{console.log(error)})
}