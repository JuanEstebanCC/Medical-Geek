//Import Schema
const User = require('../models/User');

//Importing what is necessary for twilio
const accountSid = process.env.ACCOUNT_TWILIO;
const authToken = process.env.TOKEN_TWILIO;
const client = require('twilio')(accountSid, authToken); 

module.exports = async function(moment) {

    let users;

    await User.find({ usertype: '2' }, function (err, data) {
        users = data
    })

    const time = moment().format('HH:mm');

    users.map((user) => {
        
        if (user.medicines) {

            user.medicines.map((medicine) => {
        
                const arrayTime = medicine.how_often;
                
                for (let i = 0; i <= arrayTime.length; i++) {
                
                    if (time === arrayTime[i]) {
                
                        client.messages 
                            .create({ 
                            body: `hello ${user.full_name} it's time for your medicine ${medicine.nameMedicine} its amount is ${medicine.how_many}`, 
                            from: 'whatsapp:+14155238886',       
                            to: `whatsapp:+57${user.cell_phone}` 
                        }) 
                        .then(message => console.log('message sent successfully')) 
                        .done();
                    }
                }
            })
        }  
    })
}