// A basic Functional crude system model

/**
 * A Crud Class that handles all basic Create, Read, Update and Delete Operations of a database schema
 */
 module.exports = class Crud{
    
    /**
     * you can call a new DB schema in it
     * @param {ClassDecorator} schema 
     */
    constructor(schema){
        this.schema = schema
        this.model = new schema()
    }

    /**
     * 
     * @param {Object} condition 
     */
    async find(condition){
        return this.model.find(condition).then(doc=>{
            return doc
        }).catch(err=>{
            throw err
        })
    }

    async findManyById(id){
        return this.get({_id: id}).then(doc)
    }

    async findOne(condition){
        return this.find(condition).then(doc=>{
            return doc[0] || {}
        }).catch(err=>{throw err})
    }

    async findOneById(id){
        return this.findManyById(id).then(doc=>{
            return doc[0] || {}
        }).catch(err=>{throw err})
    }

    async insert(entry){
        this.schema(entry).save(err=>{
            return err ? false : true
        })
    }

    async insertMany(data){

    }

    
}