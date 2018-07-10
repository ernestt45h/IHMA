const route = require('express').Router()
const jwt = require('../../middleware/JWTAUTH')
const Aihma = require('../../models/Aihma.model')




route.post('/', jwt, (req,res)=>{
    res.send({message: 'Hello'})
    // var body = req.body
    // if(body.age && body.sex){
    //     if(body.evidence){
    //         diagnose(res,body)
    //     }else if(body.text){
    //         parser(res,body)
    //     }else{
    //         res.json({ error: 'no data sent'}) 
    //         console.log(body)
    //     }
    // }
    // else{
    //     res.sendStatus(400)
    //     console.log(body)
    // }

})

/**
 * diagnose route
 */
route.post('/diagnose', jwt, (req, res)=>{
   prep_settings(req).then(doc=>{
        //checking if evidence is up to a specific length
        let error = 'evidence items must be more than 3 before using diagnose'
        if ( !req.body.evidence)
            throw {error}
        else if( req.body.evidence.length < 3)
            throw {error}

        let aihma = new Aihma(doc.lang, doc.is_dev)
        aihma.diagnosis(doc.sex,doc.age,doc.evidence)
            .then(response=>res.json(response))
            .catch(err=>res.status(500).send(err))
   }).catch(err=>res.status(400).send(err))
})

/**
 * Suggest Route
 */
route.post('/suggest', jwt, (req, res)=>{
   prep_settings(req).then((doc=>{
        let aihma = new Aihma(doc.lang, doc.is_dev)
        aihma.suggest(doc.sex, doc.age, req.body.selected)
        .then(response=>res.json(response))
        .catch(err=>res.status(500).send(err))
   }))

})


/**
 * parse
 */

 route.post('/parse', (req,res)=>{
     prep_settings(req).then(doc=>{
        let aihma = new Aihma(doc.lang,doc.is_dev)
        aihma.parser(req.body.text)
        .then(response=>res.json(response))
        .catch(error=>res.status(500).send(error))
     })
 })

prep_settings = async (req)=>{ 
    let is_dev = req.user.role === 'developer' ? true : false
    let lang = req.headers["content-language"] || 'en'
    let body = req.body
    let error = 'evidence items must be more than 3 before using diagnose'
    if(!body.sex || !body.age)
        throw {error: 'both sex and age required'}
        
    return {is_dev,lang,sex: body.sex, age: body.age}
}

//Functions to help
//Diagnosis function
const diagnose = function(res, body, evidence){
    console.log('asdasdasdasdasdasdasd', body)
    axios.post(host+'/diagnosis',body,{
        headers:{
            app_id: api_id,
            app_key: api_key
        }
    }).then((response)=>{
        console.log(response)
        let conditions = []
        let count = 0
        for(let condition of response.data.conditions){
            conditions.push(condition)
            count++
            if(count > 10) break
        }
        if(response){
            if (evidence) response.data.conditions = conditions
            res.json(response.data)
        }else{
            res.send('500')
        }
    }).catch(err=>{
        console.log('\n\n\n\n', body)        
        res.sendStatus(500)
        console.log(err)
    })
}

//first phase parser
const parser = function(res,body){
    if(body.text.toLowerCase() == "i'm aihma")
        res.json({
            question: {
                text: " no, i'm Aihma :)"
            }, 
        })
    else axios.post(host+'/parse',body,{
        headers:{
            app_id: api_id,
            app_key: api_key
        }
    }).then((response)=>{
        if(response.data.obvious){
            var evidences = addEvidence(response.data.mentions)
            var request = {
                sex: body.sex || 'female',
                age: body.age || 25,
                evidence: evidences,
                extras: { ignore_groups :true}                
            }
            diagnose(res, request, evidences)
        }else{
            res.send('sorry can\'t diagnose')
        }
    }).catch(err=>{
        console.log(err)
        res.sendStatus(500)
    })
}

const addEvidence = function(evidences){
    var e = []
    for(var i = 0; i < evidences.length; i++){
        e.push({
            id: evidences[i].id,
            choice_id: evidences[i].choice_id
        })
    }
    return e
}

module.exports = route