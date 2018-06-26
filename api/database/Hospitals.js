const mongoose = require('mongoose')

const Hospital = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type:String,
        required: true
    },
    type: String,
    description: String,
    city: String,
    zip: String,
    state: String,
    country: String,
    geolocation: [],

})

module.exports = mongoose.model('hospitals', Hospital)