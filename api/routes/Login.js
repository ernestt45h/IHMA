const express = require('express')
const route = express.Router()
// const User = require('../database/User')
// const hasher = require('password-hash')
// const secret = require('../config/secrets')
// const jwt = require('jsonwebtoken')

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

        // User.findOne({username: req.body.username},(err, doc)=>{
        //     if(err) res.status(500)
        //     else{
        //         //is there a user
        //         if(doc){
        //             console.log()
        //             if(doc.status === "inactive")
        //             res.json({error: 'Please verify account through email'})
        //             else{
        //                 if(doc.password === req.body.password){
        //                     res.json({
        //                         username: doc.username,
        //                         email: doc.email,
        //                         name: doc.name,
        //                         bio: doc.bio,
        //                         image: doc.image,
        //                         permissions: doc.permissions,
        //                         token: jwt.sign({
        //                             _id: doc._id,
        //                             role: doc.role,
        //                             client: req.ip,
        //                             permissions: doc.permissions
        //                         },secret.jwt)
        //                     })
        //                 }else{
        //                     res.send({error: 'wrong password'})
        //                 }
        //             }
        //         }else{
        //             res.send({error: 'wrong username or password'})
        //         }
        //     }
        // })
    }
})

module.exports = route