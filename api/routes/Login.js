const express = require('express')
const route = express.Router()

const User = require('../models/User.model')

route.all('/', (req, res)=>{
    if (req.method != "POST"){
        console.log(req.method)
        res.status('405').send('Method not allowed')
    }
    else{
        //login with user email will be implemented later
        let user = new User()
        user.login_user(req.body.username, req.body.password, req.ip)
        .then((token)=>{
            res.send(token)
        })
    }
})

module.exports = route