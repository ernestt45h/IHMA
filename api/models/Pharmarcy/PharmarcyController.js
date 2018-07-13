var Pharmacy = require("../../database/Pharmacy");
var drug=require("../../database/Drugs")


module.exports =(app) =>{





//creating a Pharmacy
app.post('/pharmacy', (req,res)=>{
  var name = req.body.name;
  var phone = req.body.Phone;
  var description=req.body.Description;
  var d_id=req.body.drug_id;
  var quantity=req.body.quantity
  var type=req.body.type
  var cordinate=req.body.cordinate
  var new_pharmacy = new Pharmacy({
    name: name,
    Phone: phone,
    Description :description,
    stock:{
      drug_id:d_id,
      quantity:quantity
    },
    Geolocation:{
      type:type,
      coordinates:cordinate
    }
    
  })
  new_pharmacy.save(function (error) {
    if (error) {
      console.log(error)
      res.send({
          error:"An errror has occured"
        })
      }else{
    res.send({
      message: 'Pharmacy saved successfully!'
    })
  }
  })
})



//Updating a Pharmacy
app.put('/pharmacy/:id', (req, res) => {
  Pharmacy.findById(req.params.id, 'name Phone Description stock Geolocation', function (error, doc) {
    if (error) { console.error(error); }
    doc.name=req.body.name
    doc.stock=req.body.stock
    doc.Phone = req.body.Phone;
    doc.Description = req.body.Description
    doc.Geolocation={
      type:req.body.type,
      coordinates:req.body.cordinate
    }
    doc.save(function(error){
      if(error){
        console.error(error)
        res.send({
          error:"Failed to update Pharmacy"
        })
      }
      res.send({
        message:"Pharmacy updated successfully"
      })
    })
  })
})




//fetching all pharmacy endpoint
app.get('/pharmacies', (req,res)=>{
  Pharmacy.find({}, 'name Phone Description stock', function (error, doc) {
    if (error) { console.error(error); }
    res.send({
      pharmacies: doc
    })
  }).sort({_id:-1})



})



//deleting a pharmacy
app.delete('/pharmacy/:id', (req, res) => {
  Pharmacy.remove({
    _id: req.params.id
  }, function(err, doc){
    if (err)
      res.send(err)
    res.send({
      message:'Pharmacy deleted successfully'
    })
  })
})





//Adding a Drug to Pharmacy
app.all('/pharmacy/:id/addDrug',(req,res)=>{


  //first check if it exist in database
drug.findOne({_id:req.body.drug_id},(err,doc)=>{
      if(!doc){
        var new_drug=new drug({
          _id:req.body.drug_id,
          name:req.body.drug_name
        })
        new_drug.save(function(err){
          if(err){
            console.log(err)
          }
        })
      }
    })


//check if it already exist in stock

Pharmacy.findOne({"stock.drug_id":req.body.drug_id },(err,doc)=>{
  if(doc){
      res.status(400).send({
          error:'Drug already exists in stock' 
          })

  }else{
    

    var new_stock_id=req.body.drug_id
    var new_stock_quantity=req.body.drug_quantity
    Pharmacy.findOneAndUpdate(
    {_id:req.body.pharm_id},
    {$push:{stock:{
      drug_id:new_stock_id,
      quantity:new_stock_quantity
    }}},function(err,success){
      if(err){
        console.log(err)
      }
      else{
        res.send({
          msg:"You have updated Stock successfully"
        })
      }
    }

      )
  }
})

})



//updating a drug in pharmacy
app.all('/pharmacy/:id/editDrug/:id',(req,res)=>{

Drug.findById(req.params.id,'name quantity',function(err,doc){
if(err){
  console.log(err)
}else{
  doc.name=req.body.name
  doc.quantity=req.body.quantity
}
doc.save(function(error)){
  if(error){
    console.error(error)
    res.send({
      error:"Failed to update drug"
    })
  }
  res.send({
    success:"Drug was updated successfully"
  })
}
}
})




//deleting a drug from the pharmacy stock
app.delete('/pharmacy/:id/deleteDrug/:DrugId',(req,res)=>{
Drug.remove({
    _id: req.params.DrugId
  }, function(err, doc){
    if (err)
      res.send(err)
    res.send({
      message:'Drug deleted successfully'
    })
  })
}








//fetching all drugs from pharmacy

app.get('/pharmacy/:id/drugs', (req,res)=>{
  Pharmacy.findById(req.params.id).populate('stock.drug_id') .exec(function (err, doc) {
  if (err){
    console.log(err)
  }else
{  

  res.json({
    pharmacyDrugs:doc

  })
}

});
  })




}


  
