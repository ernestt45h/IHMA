const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express')
const router = express.Router()

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();
db.settings({timestampsInSnapshots: true})

router.post('/', (req, res) => {
    db.collection('diagnosis').add(req.body)
    .then((result) => {
        res.json({
            text: 'data saved'
        })
    }).catch((err) => {
        console.log(err)
    });
})

module.exports = router
