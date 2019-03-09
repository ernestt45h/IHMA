const express = require('express')
const router = express.Router()
const inf = require('../../../libs/infermedica')

// router.post('/parse', function (req, res){
//     res.json({
//         mentions: [ 
//             {   
//                 choice_id: 'present',
//                 name: 'Headache',
//                 type: 'symptom',
//                 id: 's_21',
//                 orth: 'headache',
//                 common_name: 'Headache' 
//             },
//             {   
//                 choice_id: 'present',
//                 name: 'Horny',
//                 type: 'symptom',
//                 id: 's_22',
//                 orth: 'headache',
//                 common_name: 'Headache' 
//             } 
//         ]
//     })
// })

router.post('/parse', function (req, res) {
    inf.parse(req.body.text)
    .then((result) => {
        console.log(result)    
        res.json(result)    
    }).catch((err) => {
        res.status(500).send()
    });
})

router.post('/suggest', function(req, res){
    
    // res.json([{"id":"s_133","name":"Hypersensitivity to light, sounds, or smells","common_name":"Oversensitivity to light, sounds, or smells"},{"id":"s_341","name":"Illusion of surroundings being bigger or smaller than they actually are","common_name":"Illusion of surroundings being bigger or smaller than they actually are"},{"id":"s_260","name":"Convulsions or headache accompanied or preceded by buzzing or whistling","common_name":"Convulsions or headache accompanied or preceded by buzzing or whistling"},{"id":"s_295","name":"Convulsions or headache preceded by olfactory hallucinations","common_name":"Imaginary smells before headache or convulsions"},{"id":"s_54","name":"Pain near eye socket","common_name":"Pain near eye socket"},{"id":"s_605","name":"Headache, series over a period of time","common_name":"Series of headaches"},{"id":"s_488","name":"Eyes sensitive to light","common_name":"Eyes sensitive to light"},{"id":"s_214","name":"Sweating on forehead on painful side","common_name":"Sweating on forehead on painful side"}])

    inf.suggest(req.body)
        .then((result) => {
            console.log(result)
            res.json(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/diagnose', function(req, res){
    inf.diagnose(req.body)
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        console.log(err);
        res.send(err)
      });
    // res.json(
    //   {
    //     "question": {
    //       "type": "single",
    //       "text": "Does the pain increase when you touch or press on the area around your ear?",
    //       "items": [
    //         {
    //           "id": "s_476",
    //           "name": "Pain increases when touching ear area",
    //           "choices": [
    //             {
    //               "id": "present",
    //               "label": "Yes"
    //             },
    //             {
    //               "id": "absent",
    //               "label": "No"
    //             },
    //             {
    //               "id": "unknown",
    //               "label": "Don't know"
    //             }
    //           ]
    //         }
    //       ],
    //       "extras": {}
    //     },
    //     "conditions": [
    //       {
    //         "id": "c_131",
    //         "name": "Otitis externa",
    //         "common_name": "Otitis externa",
    //         "probability": 0.9654
    //       },
    //       {
    //         "id": "c_808",
    //         "name": "Earwax blockage",
    //         "common_name": "Earwax blockage",
    //         "probability": 0.1113
    //       },
    //       {
    //         "id": "c_121",
    //         "name": "Acute viral tonsillopharyngitis",
    //         "common_name": "Acute viral tonsillopharyngitis",
    //         "probability": 0.0648
    //       },
    //     ],
    //     "should_stop": false,
    //     "extras": {}
    //   }
    // )


});


router.post('/triage', function(req, res){
  inf.triage(req.body)
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      res.send(err)
  });
})

router.post('/explain', function(req, res){
  inf.explain(req.body)
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      res.send(err)
  });
})

module.exports = router