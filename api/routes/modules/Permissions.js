const express = require('express')
const route = express.Router()
const auth = require('../JwtAuth')
const Permissions = require('../../models/Permission.model')

route.get('/', auth, (req, res)=>{
    let perms = new Permissions()
    perms.get_permissions(req.body).then(doc=>{
        res.json(doc)
    }).catch(err=>{
        res.json(err)
    })
})

module.exports = route 