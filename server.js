require('dotenv').config(); // load the environment variables

const express = require('express');
const bodyParser = require('body-parser');
const email = require('./emailTransporter');
const path = require('path');

const app = express();

// app.use(express.static(path.join('client/build')));

app.use(bodyParser.json());

const port = process.env.PORT || 5001;

app.locals.appName = 'Personal Website';

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello from my personal website' });
});

app.post('/api/send_email', (req, res) => {
    console.log(req.body);

    // setup email data with unicode symbols
    let mailOptions = {
        from: `${req.body.contactName} <${req.body.contactEmail}>`, // sender address
        to: 'vinsonly62@gmail.com', // list of receivers
        subject: `[Personal Site] ${req.body.contactSubject}`, // Subject line
        text: req.body.contactMessage, // plain text body
        // html: '<b>Hello world?</b>' // html body
    };
    
    let _res = res;

    email.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            _res.status(500).send({message:'Failed.'})
        } else {
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            _res.send({message:'Message sent'});
        }
    });
})

if (process.env.NODE_ENV === 'production') {
    console.log("running in production");
    console.log("__dirname", __dirname);
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app

    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
