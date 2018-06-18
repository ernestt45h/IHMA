var mongoose = require('mongoose');
var hasher = require('password-hash')
var secret = require('../config/secrets')
var mailer =  require('../models/mail')
var jwt = require('jsonwebtoken')



const User = mongoose.Schema({
    username: {type: String, lowercase: true, unique: [true, 'user already exist'], required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: [true, 'user already exist'], required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    name: {
        first: String,
        last: String,
        other: String,
    },
    bio: String,
    role: {
        type: String,
        enum: ['self', 'patient', 'doctor', 'nurse', 'pharmacist', 'laboratorist', 'admin', 'developer', 'super_admin', 'accountant'],
        default: 'patient'
    },
    image: String,
    password: { type: String, required: [true, "can't be black"]},
    status: String,
    permissions: [],
    },{
    timestamps: true
});

User.pre('save', function(next){
    this.status = 'active'
    const prePermissions  = require('./Permission')
    //Remember to change this in producion mode
    if(!this.role) this.role = "developer"
    prePermissions.findOne({is_default: true, role: this.role}).then(doc=>{
        this.permissions = doc
        //var activation_string = jwt.sign({ activation: this._id }, secret.key)
        //mailer.sendActivation(activation_string, this.email, next)
        next()
    }).catch(err=>next(err))
})

module.exports = mongoose.model('user', User)