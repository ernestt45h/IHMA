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

Vue.use(Vuex)
Vue.use(iview)


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
