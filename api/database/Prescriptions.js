const mongoose = require('mongoose')

const Prescription = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    notes: String,
    level: String,
    time: String,
    date: String,
    quantity: String,
    unit: String,
    prescriber: {
        _id: String,
        name: {
            first: String,
            last: String
        }
    }
})

module.exports = mongoose.model('prescription', Prescription)