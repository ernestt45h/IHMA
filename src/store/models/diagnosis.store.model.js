import App from '../../main'
import Aihma from '../../models/Http'
import { stat } from 'fs';
const aihma = new Aihma()

export default storage =>  ({
    namespaced: true,
    state:{
        current: storage.get('diagnosis/current') || {
            mode: '',
            sex: '',
            age: '',
            initials: [],
            riskFactors: [],
            suggestions: [],
            symptoms: [],
            conditions: [],
            date_created: '',
            questions:[]
        },
        riskfactors: storage.get('diagnosis/setUserRiskFactors') || [],
    },

    getters:{

        
        getCurrent(state){
            return state.current
        },

        getRiskFactors(state){
            return state.riskfactors
        },
        

        getSymptoms(state){
            let current = state.current
            return [...current.initials, ...current.riskFactors, ...current.suggestions, ...current.symptoms].map(symptom=>({
                choice_id: symptom.choice_id,
                id: symptom.id
            }))
        },

        getCurrentConditions(state){
            return state.current.conditions
        }
    },

    mutations:{
        setCurrent(state, current){
            state.current = current
        },

        setMode(state, mode){
            state.current.mode = mode
        },
        setAge(state, age){
            state.current.age = age
        },
        setGender(state, gender){
            state.current.sex = gender
        },
        addInitialSymptoms(state, symptoms){
            symptoms.forEach(symptom => {
                state.current.initials.push(symptom)
            });
        },

        addRiskFactors(state, riskFactors){
            state.current.riskFactors = riskFactors            
        },

        addSuggestions(state, suggestions){
            suggestions.forEach(symptom => {
                state.current.suggestions.push(symptom)
            });
        },

        addCurrentSymptoms(state, symptoms){
            symptoms.forEach(symptom => {
                state.current.symptoms.push(symptom)
            });
        },

        setUserRiskFactors(state, rs){
            console.log('mutating',rs)
            state.riskFactors = rs
        },

        setCurrentConditions(state, conditions){
            state.current.conditions = conditions
        },

        setStartTime(state){
            state.current.date_created = new Date()
        },

        addEvidence(state, question){
            state.current.questions.push(question)
        }
    },

    actions:{
        parse({}, payload){
            return aihma.req.post('/parse', {text: payload})
            .then((result) => {
                return result.data
            }).catch((err) => {
                throw err
            });
        },

        suggest({}, payload){
            return aihma.req.post('/suggest', payload)
                .then((result) => {
                    return result.data
                })
                .catch((err) => {
                    throw err
                });
        },

        diagnose({getters}, payload){

            let current = getters.getCurrent
            let sex = current.sex
            let age = current.age

            return aihma.req.post('/diagnose', {
                sex, age, evidence: getters.getSymptoms
            })
            .then((result) => {
                return result.data
            }).catch((err) => {
                throw err
            });
        },

        triage({ getters, rootGetters}, playoad){
            let current = getters.getCurrent
            let data = {...current, uid: rootGetters['user/getUID']}
            data.evidence = getters.getSymptoms

            console.log(data)
            return aihma.req.post('/triage', data)
            .then((result) => {
                return result.data
            }).catch((err) => {
                throw err
            });
        },

        explain({ getters }, target){
            let current = getters.getCurrent
            let data = {
                sex: current.sex,
                age: current.age,
                evidence: getters.getSymptoms,
                target,
            }

            console.log(data)
            return aihma.req.post('/explain', data)
            .then((result) => {
                return result.data
            }).catch((err) => {
                throw err
            });
        },
    }
})
