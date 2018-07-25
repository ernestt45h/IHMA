const Pharmacy = require("../../database/Pharmacy");
const drug = require("../../database/Drug")
const route = require('express').Router()



//creating a Pharmacy
route.post('/', (req, res) => {
  let body = req.body
  if ("name" in body && "phone" in body) {
    let pharmacy = Pharmacy(body)
    pharmacy.save((err, doc) => {
      if (err) res.status(500).send(err)
      else res.send(doc)
    })
  }
  else res.send("At least provide both name and phone number")
})



//Updating a Pharmacy
route.put('/:id', (req, res) => {
  let update = req.body
  let id = req.params.id

  Pharmacy.findByIdAndUpdate(id, update, (err, doc) => {
    if (err) res.send({ error: 'error updating' })
    else if (doc) {
      res.send({ message: `successfully updated ${doc.name}` })
    } else {
      res.send({ message: 'coudn\'t find the pharmacy you wanted to update' })
    }
  })
})

//fetching all pharmacy endpoint
route.get('/', (req, res) => {
  Pharmacy.find({}, function (error, doc) {
    if (error) { console.error(error); }
    res.send({
      pharmacies: doc
    })
  }).sort({ _id: -1 })
})



//deleting a pharmacy
route.delete('/:id', (req, res) => {
  Pharmacy.remove({
    _id: req.params.id
  }, function (err, doc) {
    if (err)
      res.send(err)
    res.send({
      message: 'Pharmacy deleted successfully'
    })
  })
})


//getting the geolocation of the pharmacy
route.get('/geo', (req, res) => {
  if (req.query.lng && req.query.lat) {
    let point = {
      type: 'point',
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    }

    console.log(req.query)
    Pharmacy.aggregate([{
      '$geoNear': {
        'near': point,
        'spherical': true,
        'distanceField': 'dist',
        'maxDistance': req.query.radius || 5000
      }
    }]).then((doc) => {
      res.send(doc)
    })
  }
})


//getting a single pharmacy
route.get('/:name', (req, res) => {
  let name = new RegExp(req.params.name, 'i');
  Pharmacy.find({ name: name }).then(doc => {
    res.send(doc)
  }).catch(err => {
    console.log('error')
  })
})




//fetching all drugs from pharmacy

route.get('/:id/drugs', (req, res) => {
  Pharmacy.findById(req.params.id).populate('stock.drug_id').exec(function (err, doc) {
    if (err) {
      console.log(err)
    } else {

      res.json({
        pharmacyDrugs: doc

      })
    }

  });
})





//Adding a Drug to Pharmacy
route.all('/:id/addDrug', (req, res) => {
  let PharmacyId = req.params.id
  let DrugName = req.body.name
  let DrugQuantity = req.body.quantity


  drug.findOne({ name: DrugName }, (err, doc) => {
    if (doc) {
      Pharmacy.findOne({ "stock.drug_id": doc._id }, (err, success) => {
        if (success) {
          res.status(400).send({
            error: 'Drug already exists in stock'
          })
        } else {
          Pharmacy.findOneAndUpdate({ _id: PharmacyId }, { $push: { stock: {_id:doc._id, drug_id: doc._id, quantity: DrugQuantity } } }, function (err, success) {
            if (err) {
              console.log(err)
            }
            else {
              res.send({
                msg: "You have updated Stock successfully"
              })
            }
          })
        }
      })
    }
    else {
      var new_drug = new drug({
        name: DrugName,
        quantity: DrugQuantity
      })
      new_drug.save(function (err) {
        if (err) {
          console.log(err)
        }
        else {
          Pharmacy.findOne({ "stock.drug_id": new_drug._id }, (err, success) => {
            if (success) {
              res.status(400).send({
                error: 'Drug already exists in stock'
              })
            } else {
              Pharmacy.findOneAndUpdate({ _id: PharmacyId }, { $push: { stock: {_id:new_drug._id, drug_id: new_drug._id, quantity: DrugQuantity } } }, function (err, success) {
                if (err) {
                  console.log(err)
                }
                else {
                  res.send({
                    msg: "You have updated Stock successfully"
                  })
                }
              })
            }
          })

        }
      })
    }
  })
})





//updating a drug in pharmacy
route.put('/:id/drugs/:drugId',(req,res)=>{
  Pharmacy.update({_id: req.params.id, 'stock.drug_id': req.params.drugId}, {'stock.$.quantity': req.body.quantity},(err,doc)=>{
    if(err) {console.log(err)}
    else{
      res.send({msg:'Drug updated successfully'})
    }
  })
  
})





//deleting a drug from the pharmacy
route.delete('/:id/drugs/:drugId',(req,res)=>{
  Pharmacy.update({_id: req.params.id}, {$pull: {stock: {_id: req.params.drugId}}},(err, num)=> {
    if(err) {console.log(err); }
    else{
      res.send({msg:'Drug deleted successfuly'})
    }  
})

})







//deleting a drug from the pharmacy stock
route.delete('/pharmacy/:id/deleteDrug/:DrugId', (req, res) => {
  Drug.remove({
    _id: req.params.DrugId
  }, function (err, doc) {
    if (err)
      res.send(err)
    res.send({
      message: 'Drug deleted successfully'
    })
  })
})










module.exports = route