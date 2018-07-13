const nf = require('../config/secrets').nf
const host = nf.host
const host_name = nf.name
const api_id = nf.app_id 
const api_key = nf.app_key
const axios = require('axios')

class Aihma{

    /**
     * Accepts the language used for aihma
     * en – English model, used automatically by default
     * fr – French model
     * de – German model
     * pl – Polish model
     * sk – Slovak model
     * es – Spanish model
     * pt-br – Brazilian Portuguese model
     * ru – Russian model
     * zh – Chinese (Simplified) model
     * 
     * @param {String} model 
     */
    constructor(model='en', is_dev=false){
        this.api = host
        this.api_id = api_id
        this.api_key = api_key
        this.lang = host_name+'-'+ model
        this.headers = {    
            App_id: api_id,
            App_key: api_key,
            "Dev-Mode": is_dev,
            Model: this.lang

        }
    }

    /**
     * returns medical signs and symptoms caused by conditions
     * 
     * 
     * @param {string} symptom_id 
     */
    symptom(symptom_id){}
    explain(){}

    /**
     * Takes a condition ID and gives out the details of that condition
     * 
     * @param {string} condition_id 
     */
    conditions(condition_id){
        return axios.get(this.api+'/conditions/'+condition_id,{headers:this.headers})
        .then(doc=>{
            return doc.data
        }).catch(err=>{
            return err
        })
    }

    search(){}
    triage(){}



    /**
     * It uses Natural Language Processing technology,
     * allowing to understand clinical concepts (symptoms and risk factors) 
     * passed into the parameter as natural language text.
     * 
     * @param {string} message 
     */
    parser(message){
        if(this.is_empty(message)) return {error: 'message field required'}
        return axios.post(this.api+'/parse',{headers: this.headers}).then(doc=>{
            if(doc.data) return doc.data
            else return {error: 'can\'t seem to understand your symptom'}
        }).catch(err=>{
            return {error: err}
        })
    }


    /**
     *  Helps in suggesting other possible symptoms that have frequently been reported
     *  by other users of the same sex and similar age upon the evidence you give it.
     * 
     * @param {string} sex 
     * @param {number} age 
     * @param {[string]} selected 
     */
    suggest(sex, age, selected){
        if (this.is_empty(sex, age, selected)) return {error: 'sex, age and selected suggessios required'}
        return axios.post(this.api+'/suggest/').then(doc=>{
            return doc.data
        }).catch(err=>{
            return {error: err}
        })
    }

    /**
     * The most important part of our API, which handles diagnostic reasoning.
     *  Apart from sex and age, it requires a list of observed evidence 
     * (symptoms, risk factors or laboratory test results). The list cannot be empty, 
     * so first you need to gather some initial information about the case by using the search or parse
     * 
     * Let's assume we have a male patient, aged 30, 
     * suffering from severe headaches, light sensitivity and a stiff neck.
     * Each observation is represented by a unique ID; 
     * in this case the symptom IDs are s_1193, s_488 and s_418, respectively. 
     * Each piece of evidence can have one of three possible states: present, absent or unknown. 
     * The state is defined using the choice_id attribute.
     * 
     * @param {String} sex "male" or "female"
     * @param {Number} age 
     * @param {[{id:String, choice:String}]} evidence [{"id": "s_47", "choice_id": "present", "initial": true}]
     */
    async diagnosis(sex, age, evidence){
        if(this.is_empty(sex,age)) return {error: 'sex and age required'}
        let request = {sex, age, evidence}
        //makes the request to the api server
        return axios.post(host+'/diagnosis', request, {
            headers: this.headers
        }).then((res) => {
            let doc = res.data
            if(doc)return doc
            else return {error: "can't seem to diagnose your symptom at the moment"}
        }).catch((err) => {
            return {error: err}
        });
    }

    /**
     * It represent a patient’s chronic conditions (e.g. diabetes),
     * lifestyle factors (e.g. smoking), geographical locations (e.g. Central Africa)
     * and events (e.g. insect bite or head injury) that may modify the baseline
     * probability of conditions. 
     * 
     * Note: It takes a risk factor id only but result can be added to evidence for
     * diagnosis
     *  
     * 
     * @param {string} rf_id
     */
    risk_factor(rf_id){
        return axios.get(this.api+'/risk_factors/'+rf_id)
        .then(doc=>{
            return doc.data
        }).catch(err=>{
            return err
        })
    }

    /**
     * Checks if any of the given parameters is null or undefined
     * returns false when all parameters contain data
     * @param {String} list 
     */
    is_empty(...list){
        if(list)
        for(item of list){
            if(item) return true
            else return false
        }else return true
    }

    /**
     * Combines two arrays together
     * @param {Array} oldlist 
     * @param {Array} newlist 
     */
    concat_list(oldlist , newlist){ 
        if(oldlist && newlist){
            if(!oldlist) oldlist = []
            for(let item of newlist){
                oldlist.push(item)
            }
            return oldlist
        }else return
    }
}