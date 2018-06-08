var mongoose = require('mongoose');


const Permission = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    feature: {
        id: mongoose.Schema.ObjectId,
        name: String
    },
    description: String,
    role: String,
    actions: [{
        type: String,
        enum: ['add', 'edit', 'delete', 'update', 'view']
    }]
})

module.exports = mongoose.model('permission', Permission)