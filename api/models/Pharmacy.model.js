const pharmacy = require('../database/Pharmacy')
const Drugs = require('../database/Drug')


module.exports = class Pharmacy{

    /**
     * 
     * @param {{name: string, }} body 
     */
    async create_hospital(body){
        if(!body.name || !body.phone){
            throw {error: 'At least provide both name and phone number'}
        }else{

            return pharmacy
            .findOne({name: body.name})
            .then(doc=>{
                if(doc) throw {error: "pharmacy already exists"}
                else{
                    let pharm = new pharmacy(body)
                    return pharm.save(function (err){
                        if (err) { throw {error: 'failed in creating pharmacy'}}
                        else{ return {message: 'pharmacy ' + body.name + ' has been successfully created'}}
                        console.log(err ? 'failed': 'success')
                    })
                }
            })
            
        }
    }


}