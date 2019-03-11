const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()

app.use(bodyParser.json());
app.use(cors());

var aihma = require('./models/infermedica');
var payments = require('./models/payments');
var diagnosis = require('./models/diagnosis');
//Do something like geolocation calculation

app.use('/aihma', aihma);
app.use('/payment', payments);
app.use('/diagnosis', diagnosis);



app.use('/', ( req, res ) => {
    res.send('Hello functio');
});


module.exports = app