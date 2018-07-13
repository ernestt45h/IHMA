const route = require('express').Router()
const Hospital = require('../../database/Hospitals')

route.post('/', (req,res)=>{
    let body = req.body
    if("name" in body && "phone" in body){
        let hospital = Hospital(body)
        hospital.save((err,doc)=>{
            if(err) res.status(500).send(err)
            else res.send(doc)
        })
    }
    else res.send("At least provide both name and phone number")
})

route.get('/', (req, res)=>{
    Hospital.find().then(doc=>{
        res.send(doc)
    })
})

route.get('/geo',(req, res)=>{ 
    if(req.query.lng && req.query.lat){
        let point = {
            type: 'point', 
            coordinates: [parseFloat(req.query.lng) ,parseFloat(req.query.lat)]
        }

        console.log(req.query)
        Hospital.aggregate([{
            '$geoNear' : {
                'near': point,
                'spherical': true,
                'distanceField': 'dist',
                'maxDistance': req.query.radius || 5000
            }
        }]).then((doc)=>{
            res.send(doc)
        })
    }
})



route.get('/:name', (req, res)=>{
    let name = new RegExp(req.params.name, 'i'); 
    Hospital.find({name:  name }).then(doc=>{
        res.send(doc)
    }).catch(err=>{
        console.log('error')
    })
})

route.put('/:id',(req, res)=>{
    let update = req.body
    let id = req.params.id

    Hospital.findByIdAndUpdate(id,update,(err,doc)=>{
        if(err) res.send({error: 'error updating'})
        else if(doc){
            res.send({message: `successfully updated ${doc.name}`})
        }else{
            res.send({message: 'coudn\'t find the hospital you wanted to update'})
        }
    })
})



route.get('*',(req,res)=>{
    res.send('hello there stupido :D')
})
module.exports = route