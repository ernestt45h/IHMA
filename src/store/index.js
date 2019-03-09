import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Storage = { 
    get: function (key){
        return JSON.parse(localStorage.getItem('ocp/'+key))
    },

    set: function Storage(key, value){
        console.log(key, value);
        localStorage.setItem('ocp/'+key, JSON.stringify(value))
    }
}

// Modules
import user from './models/user.store.model'
import diagnosis from './models/diagnosis.store.model'

// Plugins
import persistentStore from './plugins/persistentStore.plugin.store'

const store = new Vuex.Store({
    modules: { user: user(Storage),  diagnosis: diagnosis(Storage)},

    plugins: [persistentStore(Storage)]
})

export default store