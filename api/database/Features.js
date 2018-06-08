var mongoose = require('mongoose');


const Feature = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    access_point: String,
})

module.exports = mongoose.model('feature', Feature)