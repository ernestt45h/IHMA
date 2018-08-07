var mongoose = require('mongoose');


const Permission = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sub_name: String,
    access_point: String,
    feature: {
        id: mongoose.Schema.ObjectId,
        name: String
    },
    description: String,
    role: String,
    actions: [{
        type: String,
        enum: ['create', 'read', 'delete', 'update', 'develop']
    }],
    target:String,
    is_default: {
        type: Boolean,
        default: false
    },
    author: {type: String},
    fa_icon: String
})

Permission.pre('save', function(next){
    this.name = this.name.toUpperCase()
    this.sub_name = this.name.toLowerCase()
    if(!this.access_point) {
        const host = require('../config/host')
        this.access_point = host.name + '/' + this.sub_name
    }
    if(!this.role) this.role = 'developer'
    if(!this.target) this.target = 'self'
    if(this.role === 'developer'){
        this.actions = ['create', 'read', 'delete', 'update']
        this.is_default = true
    }

    next()
})

module.exports = mongoose.model('permission', Permission)