const express = require('express')
const app = express()

const mongoose = require('mongoose')
const db = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())

app.use(express.static(__dirname + '/public'));

mongoose.connect(db.name,(err)=>{
    if(err){
        console.log("can't connect to database")
        return
    }

    console.log('connected')

    const Login = require('./models/Login')
    const Signup = require('./models/Signup')
    const Activate = require('./models/activate')
    const PermissionAdder = require('./models/Features/PermissionAdder')
    const Diagnosis = require('./models/Features/Diagnosis')
    const Prescription = require('./models/Features/Prescriptions')
    
    
    app.use('/login', Login)
    app.use('/signup', Signup)
    app.use('/activate', Activate)
    app.use('/permission-adder', PermissionAdder)
    app.use('/diagnosis', Diagnosis)
    app.use('/prescription', Prescription)
      
    app.listen(80);
});

