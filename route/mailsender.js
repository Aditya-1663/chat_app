const path = require('path')
const fs = require('fs')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const { EMAIL, PASSWORD } = require('../env')
const htmlFilePath = path.join(__dirname, 'email.html');
var htmlContent = fs.readFileSync(htmlFilePath,'utf8');




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

    var url=`http://localhost:5000/verifying/${req.authtoken}`


    htmlContent = htmlContent.replace(
        "%link%",url
      );
      var em=req.email
    //   console.log(em)
    htmlContent = htmlContent.replace(
        "%username%",em
      );
    // console.log(em)
    var mailOptions = {
        from: EMAIL,
        to: EMAIL,
        subject: 'varification mail',
        text:"please verify you account",
        // html: `<a href="${url}">Click Here</a>`,
        html: htmlContent,

        text: 'hello this is the first message'
    };
    
    htmlContent = htmlContent.replace(url,
        "%link%"
      );
      var em=req.email
    //   console.log(em)
    htmlContent = htmlContent.replace(em,
        "%username%"
      );


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