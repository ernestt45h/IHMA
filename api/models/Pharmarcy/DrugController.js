var Drug = require("../../database/Drugs");
module.exports =(app) =>{


//adding a drug
app.post('/drug', (req,res)=>{
  var db=req.db
  var drug=Drug(req.body)
  drug.save((err,doc)=>{
if(err){
	console.log(err)
}
else {
                res.json({msg:'Drug has been added successfullly'})        
            }
  })
})


//fetching all drugs

app.get('/drugs', (req,res)=>{
  Drug.find({}, 'name quantity', function (error, doc) {
    if (error) { console.error(error); }
    res.send({
      drugs: doc
    })
  }).sort({_id:-1})



})


//updating a drug

app.put('/drug/:id', (req, res) => {
  var db = req.db;
  Drug.findById(req.params.id, 'name', function (error, doc) {
    if (error) { console.error(error); }
    doc.name=req.body.name
    doc.save(function(error){
      if(error){
        console.error(error)
      }
      res.send({
        message:"Drug updated successfully"
      })
    })
  })
})

//fetching single drug

app.get('/drug/:id', (req,res)=>{

  var db = req.db;
  Drug.findById(req.params.id, 'name quantity', function (error, doc) {
    if (error) { console.error(error); }
    res.send(doc)
  })


})

app.delete('/drug/:id', (req, res) => {
  var db = req.db;
  Drug.remove({
    _id: req.params.id
  }, function(err, doc){
    if (err)
      res.send(err)
    res.send({
      message:'Drug deleted successfully'
    })
  })
})



}

