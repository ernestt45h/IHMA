const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

module.exports = function(req, res, next){
    const bearerHeader = req.header("authorization");
    //Check if there is token
    if (typeof bearerHeader !== 'undefined'){
        //Getting the token
        const bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        //Verifing the token
        try {
            req.user = jwt.verify(req.token, secret.jwt)
            if(req.user.client == req.ip) next()
            else res.status(401).send("Unacceptable token")
        } catch (error) {
            res.status(401).send("Unacceptable token")
        }
        }
        /*jwt.verify(req.token, secret.jwt, (err, doc)=>{
            if (err) res.send({message: err.message});
            else{
                req.user = doc.user;
                console.log(req.token);
                //next()
            }
        })*/
    else {
        res.status(401).send("user is unauthorized")
    }
};