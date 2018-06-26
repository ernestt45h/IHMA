// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store';
import iview from 'vuesax'
import bootstrap from 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import 'vuesax/dist/vuesax.css'
import './assets/css/style.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.filter('simpleDate', (val)=>{
  if(val){
    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let date = new Date(val)
    var month = months[date.getMonth()]
    var day = days[date.getDay()]
    var dayDate = date.getDate()
    var year = date.getFullYear()
    return day + " " + dayDate + " " + month + " " + year
  }
})

Vue.filter('captilize', (val)=>{
  if (!val) return ''
  else{
    val = val.toString()
  return val.charAt(0).toUpperCase() + val.slice(1)
  }
})

Vue.use(Vuex)
Vue.use(iview)


export const bus = new Vue()

Vue.config.ignoredElements = [/^ion-/]
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store : store.store,
  router,
  components: { App },
  template: `
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
  `
})
