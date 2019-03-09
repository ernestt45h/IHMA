// import { 
//     initializeApp,
//     firestore, 
//     auth
// } from 'firebase'

import app from 'firebase/app'
require('firebase/auth')
require('firebase/firestore')

// Import firebase configs
import configs from '../../config/settings'
const FirebaseConfig = configs.firebase

// initialize firebase
app.initializeApp(FirebaseConfig)

const db = app.firestore()

// ? Enable Offline support
db.enablePersistence()

export default {
    install: function(Vue, options){
        Vue.prototype.$db = db
        Vue.prototype.$auth = app.auth()
    }
}