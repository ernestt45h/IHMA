const functions = require('firebase-functions');
const HTTPRequests = require('./apis/Http')
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest(HTTPRequests)
