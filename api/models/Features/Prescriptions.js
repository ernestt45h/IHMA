//const Prescription = require('../../database/Prescriptions')
const express = require('express')
const route = express.Router()
const auth = require('../JwtAuth')
const pres = require('../../public/test/morning.json')

route.get('/', (req, res)=>{
    res.json(pres)
    console.log(pres)
})

module.exports = route