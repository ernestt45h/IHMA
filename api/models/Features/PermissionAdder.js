const express = require('express')
const route = express.Router()
const auth = require('../JwtAuth')


route.use('/', auth, (req, res)=>{
    if(req.method === 'POST'){
        if(req.user.role == "developer"){
            const Permission = require('../../database/Permission')
            Permission.findOne(req.body, (err, doc)=>{
                if(err) res.send(err)
                else if (!doc) {
                    var perms = new Permission(req.body)
                    perms.save((err, doc)=>{
                        if(err) res.json(err)
                        else res.json(doc)
                    })
                }else res.send(doc)
            })
            
        }else{
            res.sendStatus(401)
        }
    }else{
        res.sendStatus(405)
    }
})

module.exports = route 