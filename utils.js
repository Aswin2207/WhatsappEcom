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
                id: 'English',
            },
            {
                title: 'Maths',
                id: 'Maths',
            },
        ],
    }).catch(error => { console.log(error) })
}
exports.secondMessage = async (recipientName, recipientPhone, subject) => {
    await Whatsapp.sendSimpleButtons({
        message: `Here are list of Tutors for ${subject} for your Grade`,
        recipientPhone: recipientPhone,
        listOfButtons: [
            {
                title: 'A',
                id: 'A',
            },
            {
                title: 'B',
                id: 'B',
            },
            {
                title: 'C',
                id: 'C',
            },
        ],
    }).catch(error => { console.log(error) })
}

exports.thirdMessage = async (recipientName, recipientPhone, tutor) => {
    await Whatsapp.sendSimpleButtons({
        message: `${tutor} will be available on`,
        recipientPhone: recipientPhone,
        listOfButtons: [
            {
                title: '23 Jun 6pm',
                id: '6pm',
            },
            {
                title: '23 Jun 8pm',
                id: '8pm',
            },
            {
                title: '23 Jun 9pm',
                id: '9pm',
            },
        ],
    }).catch(error => { console.log(error) })
}

exports.fourthMessage = async (recipientName, recipientPhone, tutor,slot) => {
    await Whatsapp.sendSimpleButtons({
        message: `Please confirm your booking with tutor ${tutor} On ${slot}`,
        recipientPhone: recipientPhone,
        listOfButtons: [
            {
                title: 'Yes',
                id: 'Yes',
            },
            {
                title: 'No',
                id: 'No',
            }
        ],
    }).catch(error => { console.log(error) })
}

exports.fifthMessage = async (recipientName, recipientPhone, option) => {

    let msg;
    if(option ==='Yes'){
        msg='Thank You Happy Learning'
    }
    else{
        msg='Back To Start'
    }
    await Whatsapp.sendSimpleButtons({
        message: msg,
        recipientPhone: recipientPhone
    }).catch(error => { console.log(error) })
}