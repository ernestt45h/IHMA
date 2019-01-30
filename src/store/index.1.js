import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user: JSON.parse(localStorage.getItem('user')) || ''
    },
    getters: {
        user: state=> {return state.user}, 
        token: state=>{return state.user.token},
        permissions: state=>{return state.user.permissions},
        first_name: state=>{
            if(state.user.name) return state.user.name.first || ''
            else return ''
        },
        isUser: state=>{
            if(state.user.token){
                return true
            }else return false
        }
    },
    mutations:{
        user: (state, payload)=>{
            state.user = payload
            localStorage.setItem('user', JSON.stringify(payload))
        }
    },
    actions:{
        logout:({commit})=>{
            commit('user', '')
        }
    }
})

export default {store}