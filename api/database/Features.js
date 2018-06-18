var mongoose = require('mongoose');


const Feature = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    access_point: String,
    sub_name: String,
    fa_icon: String,
    target: {
        type: String,
        enum: ['self', 'patient', 'doctor', 'nurse', 'pharmacist', 'laboratorist', 'admin', 'developer', 'super_admin', 'accountant']
    },
    type: {
        type: String,
        enum: ['free', 'monthly', 'anually']
    }
})

module.exports = mongoose.model('feature', Feature)