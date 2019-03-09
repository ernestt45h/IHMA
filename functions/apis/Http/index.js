const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()

app.use(bodyParser.json());
app.use(cors());

var aihma = require('./models/infermedica');
var payments = require('./models/payments');
//Do something like geolocation calculation

app.use('/aihma', aihma);
app.use('/payment', payments);



app.use('/', ( req, res ) => {
    res.send('Hello functio');
});


module.exports = app