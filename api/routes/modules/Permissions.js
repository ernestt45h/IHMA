const express = require('express')
const route = express.Router()
const auth = require('../JwtAuth')
const Permissions = require('../../models/Permission.model')
const perms = new Permissions()

route.get('/', auth, (req, res)=>{
    perms.get_permissions(req.body).then(doc=>{
        res.json(doc)
    }).catch(err=>{
        res.json(err)
    })
})


/**
 * Used to update user permissions
 */
route.put('/:id', (req,res)=>{
    perms.update(req.body, req.params.id).then(doc=>{
        res.json(doc)
    }).catch(err=res.json(err))
})

/**
 * Used to update default permssions
 */
route.put('/', (req,res)=>{
    perms.update(req.body).then(doc=>{
        res.json(doc)
    }).catch(err=res.json(err))
})

module.exports = route 