const mongoose = require('mongoose')



const Drug = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    

})

module.exports = mongoose.model('drug', Drug)