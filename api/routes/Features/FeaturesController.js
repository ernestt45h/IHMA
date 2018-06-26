const express = require('express')
const route = express.Router()
const auth = require('../JwtAuth')


route.post('/', auth, (req, res)=>{
    if(req.user.role == "developer"){
        const Feature = require('../../database/Features')
        Feature.findOne(req.body, (err, doc)=>{
            if(err) res.send(err)
            else if (!doc) {
                var feature = new Feature(req.body)
                feature.save((err, doc)=>{
                    if(err) res.json(err)
                    else res.json(doc)
                })
            }else res.send(doc)
        })
        
    }else{
        res.sendStatus(401)
    }
})

module.exports = route 