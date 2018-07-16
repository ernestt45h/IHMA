const Drug = require("../../database/Drug");
const route = require('express').Router()



//adding a drug
route.post('/', (req,res)=>{
  let body=req.body
  if("name" in body){
    let drug=Drug(body)
    drug.save((err,doc)=>{
      if(err)res.status(500).send(err)
      else res.send(doc)
    })
  }
  else res.send("At least provide the name of the drug")
})

//fetching all drugs

route.get('/', (req,res)=>{
  Drug.find({}, 'name quantity', function (error, doc) {
    if (error) { console.error(error); }
    res.send({
      drugs: doc
    })
  }).sort({_id:-1})



})


//updating a drug

route.put('/:id', (req, res) => {
  Drug.findById(req.params.id, 'name', function (error, doc) {
    if (error) { console.error(error); }
    doc.name=req.body.name
    doc.save(function(error){
      if(error){
        res.send({error: 'error updating'})
      }
      res.send({
        message:"Drug updated successfully"
      })
    })
  })
})

//fetching single drug

route.get('/:name', (req, res) => {
  let name = new RegExp(req.params.name, 'i');
  Drug.find({ name: name }).then(doc => {
    res.send(doc)
  }).catch(err => {
    console.log('error')
  })
})

//deleting a drug


route.delete('/:id', (req, res) => {
  Drug.remove({
    _id: req.params.id
  }, function(err, doc){
    if (err)
      res.send({
        error:'Failed to delete drug'
      })
    res.send({
      message:'Drug deleted successfully'
    })
  })
})



module.exports = route

