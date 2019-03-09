var payment = require('express').Router();

payment.use('/momo', require('./MobileMoney'));

module.exports = payment;