const express = require('express')
const route = express.Router()
const User = require('../models/User.model')
let user = new User()

route.post('/is_user', (req, res)=>{
    let isUser = user.is_user(req.body.type, req.body.value)
    isUser.then((doc)=>{
        console.log(doc)
        res.json(doc)
    })
})

route.all('/', (req, res)=>{
    if (req.method != "POST"){
        console.log(req.method)
        res.status('405').send('Method not allowed')
    }
    else{
        user.create_user(req.body).then(doc=>{
            res.json(doc)
            console.log(doc)
        })
    }

    //     var user = User(req.body)
    //     user.save((err, doc)=>{
    //         if(err) {
    //             console.log(err)
    //             User.findOne({username: req.body.username}, (err, doc)=>{
    //                 if(doc){
    //                     res.json({error: 'Username already exsists'})   
    //                 }     
    //                 else{
    //                     User.findOne({email: req.body.email}, (err, doc)=>{
    //                         if(doc){
    //                             res.json({error: 'Email already exsists'})
    //                         }   
    //                         else res.json({error: 'Error signing you up, please try again'})
    //                    })
    //                 }
    //             })       
    //         }
    //         else {
    //             res.json({msg:'User signed up successfullly'})        
    //         }
    //     })
    // }
})


module.exports = route