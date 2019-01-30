import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Modules
import user from './models/user.store.model'

// Plugins
import user_plug from './plugins/user.plugin.store'

const store = new Vuex.Store({
    modules: { user },

    plugins: [user_plug]
})

export default store