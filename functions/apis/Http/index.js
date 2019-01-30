const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())

//Do something like geolocation calculation

app.all('*', (req,res)=>{
    res.send('Hello function')
})


module.exports = app