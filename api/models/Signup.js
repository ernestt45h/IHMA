const express = require('express')
const route = express.Router()
const User = require('../database/User')


route.post('/:id', (req, res)=>{
    switch(req.params.id){
        case 'username': User.findOne({username: req.body.username},(err, doc)=>{
            if(doc) res.json({isUser: true})
            else res.json({isUser: false})
        })
        break
        case 'email': User.findOne({email: req.body.email},(err, doc)=>{
            if(doc) res.json({isUser: true})
            else res.json({isUser: false})
        })
        break
    }
})

route.all('/', (req, res)=>{
    if (req.method != "POST"){
        console.log(req.method)
        res.status('405').send('Method not allowed')
    }
    else{
        var user = User(req.body)
        user.save((err, doc)=>{
            if(err) {
                console.log(err)
                User.findOne({username: req.body.username}, (err, doc)=>{
                    if(doc){
                        res.json({error: 'Username already exsists'})   
                    }     
                    else{
                        User.findOne({email: req.body.email}, (err, doc)=>{
                            if(doc){
                                res.json({error: 'Username already exsists'})
                            }   
                            else res.json({error: 'Error signing you up, please try again'})
                       })
                    }
                })       
            }
            else {
                res.json({msg:'User signed up successfullly'})        
            }
        })
    }
})


module.exports = route