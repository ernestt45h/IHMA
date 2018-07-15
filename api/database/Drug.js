const mongoose = require('mongoose')



const Drug = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity:{
        type:Number
    }

})

module.exports = mongoose.model('drug', Drug)