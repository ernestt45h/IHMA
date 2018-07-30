const route = require('express').Router()
const auth = require('../JwtAuth')
const User = require('../../models/User.model')
const user = new User()


route.get('/:type/:value',(req,res)=>{

    user.get_one_user(req.params.type, req.params.value).then(doc=>{
        res.json(doc)
    }).catch(err=>{
        res.json(err)
    })
})

route.get('/', (req, res)=>{
    user.get_all().then(doc=>{
        res.json(doc)
    })
})

route.put('/', (req,res)=>{
    user.update_user(req.body._id, req.body).then(doc=>res.json(doc)).catch(err=>res.json(err))
})



module.exports = route