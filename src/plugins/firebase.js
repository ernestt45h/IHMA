import { 
    app, 
    initializeApp,
    firestore, 
    auth
} from 'firebase'

// Import firebase configs
import configs from '../../config/settings'
const FirebaseConfig = configs.firebase

// initialize firebase
initializeApp(FirebaseConfig)

const db = firestore()

// ? Enable Offline support
db.enablePersistence()

export default {
    install: function(Vue, options){
        Vue.prototype.$db = db
        Vue.prototype.$auth = auth()
    }
}