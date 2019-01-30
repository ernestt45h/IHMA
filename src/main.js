// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './Main.vue'
import Vuex from 'vuex'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from './store';
import iview from 'iview'
import locale from 'iview/dist/locale/en-US';
import bootstrap from 'bootstrap'
import transition from 'vue2-transitions'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
import 'iview/dist/styles/iview.css'
// Remember to change font awesome to iview's icons
import 'font-awesome/css/font-awesome.min.css'
import firebase from "./plugins/firebase";


// Vue.filter('simpleDate', (val)=>{
//   if(val){
//     var months = ["January", "Febuary", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]
//     var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//     let date = new Date(val)
//     var month = months[date.getMonth()]
//     var day = days[date.getDay()]
//     var dayDate = date.getDate()
//     var year = date.getFullYear()
//     return day + " " + dayDate + " " + month + " " + year
//   }
// })

Vue.filter('captilize', (val)=>{
  if (!val) return ''
  else{
    val = val.toString()
  return val.charAt(0).toUpperCase() + val.slice(1)
  }
})

Vue.use(Vuex)
Vue.use(iview, {locale})
Vue.use(transition)
Vue.use(firebase)

sync(store, router)

// export const bus = new Vue()

// Vue.config.ignoredElements = [/^ion-/]
Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store : store,
  router,
  components: { App },
  template: `
  <slide-y-down-transition mode="out-in">
    <router-view/>
  </slide-y-down-transition>
  `
})
