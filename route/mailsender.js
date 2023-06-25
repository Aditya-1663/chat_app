const path = require('path')
const fs = require('fs')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const { EMAIL, PASSWORD } = require('../env')


const sendmail = async (req, res) => {

    // real email 
    const transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });


    
        // console.log(req.authtoken+"\n aditya")

    var url=`http://localhost:3000/verifying/${req.authtoken}`
  
    var mailOptions = {
        from: EMAIL,
        to: EMAIL,
        subject: 'varification mail',
        text:"please verify you account",
        html: `<a href="${url}">Click Here</a>`,

        text: 'hello this is the first message'
    };


    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(404).json(error)
            console.log(error);
        } else {

            res.json(info)
            console.log('Email sent: ' + info.response);
        }
    })

 
}

module.exports = sendmail