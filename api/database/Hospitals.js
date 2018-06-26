const mongoose = require('mongoose')

const GeoLoc = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates:{
        type: [Number],
        index: "2dsphere"
    }
})

const Hospital = new mongoose.Schema({
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
    geolocation: GeoLoc,

})

module.exports = mongoose.model('hospitals', Hospital)