var express = require('express');
var router = express.Router();
var mazzuma = require('../../../../libs/mazzuma');

router.post('/', function(req, res){
    if(!req.body.number){
        res.json({"code":1,"status":"failed","id":"XXXXX"});
    }else{
        mazzuma.payFromMtn(req.body.number)
        .then(function(result) {
            res.send(result);
        }).catch(function(err) {
            res.send(err);
        });
    }
});

module.exports = router;