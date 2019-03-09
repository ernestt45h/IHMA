const axios = require('axios')
let url = axios.create({
    baseURL: 'https://api.infermedica.com/v2',
    headers: {
        'App-Id': '69749301',
        'App-Key': '9a1c74e83ee9dc948adb9eac9996ef73'
    }
})
module.exports = {
    parse(text){
        return url.post('/parse', {text})
            .then((result) => {
                return result.data
            }).catch((err) => {
                throw err
            });
    },

    suggest(data){
        return url.post('/suggest', data)
            .then((result) => {
                return result.data
            }).catch((err) => {
                throw err
        });
    },

    diagnose(data){
        return url.post('/diagnosis', data)
            .then((result) => {
                // console.log(result)
                return  result.data
            }).catch((err) => {
                // console.log(err.response)
                throw err
        });
    },

    triage(data){
        let triage = {
            sex: data.sex,
            age: data.age,
            evidence: data.evidence
        }
        let condition = data.condition
        console.log(data);
        
        return axios.all([ url.post('/triage', triage),  url.get(`/conditions/${condition.id}`)])
        .then(axios.spread((triage, condition)=>{
            let result = triage.data
            result.condition = condition.data
            return result
        }))
        .catch((err) => {
                throw err
        });
    },
    
    explain(data){
        return axios.all([ url.post('/explain', data),  url.get(`/conditions/${data.target}`)])
        .then(axios.spread((triage, condition)=>{
            let result = triage.data
            result.condition = condition.data
            return result
        }))
        .catch((err) => {
                throw err
        });
    }
}