const express = require('express')
const route = express.Router()
const User = require('../database/User')
const jwt = require('jsonwebtoken')
const secret = require('../config/secrets')

route.get('/:id', (req, res)=>{
    var token = req.params.id
    if(!token) res.json({error: "no token provided"})
    else{
        try {
            const verified = jwt.verify(token, secret.key)
            console.log(verified._id)
            res.send(verified)
        } catch (error) {
            res.status(401).json({error: "wrong token provided"})
        }
    }
})

module.exports = route