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

const Pharmacy = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type:String,
        required: true
    },
    description: String,
    geolocation: GeoLoc,
    datecreated:{
        type:Date,
        default:Date.now
    },
    stock:[{
        drug_id:{type:mongoose.Schema.ObjectId, ref: 'drug'},
        quantity:{
            type:Number,
            default:0
        }
    }]

})

module.exports = mongoose.model('Pharmacy', Pharmacy)