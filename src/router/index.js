import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
const Login = ()=>import('../components/forms/login')
const SignUp = ()=>import('../components/forms/signup')
const Store = ()=>import('../store')
const store = Store().then((store)=>{
  return store.default.store
})
const ActivateUser = ()=>import('../components/misc/UserActivation')
const Activator = ()=>import('../components/misc/Activator')
const Error404 = ()=>import('../components/misc/Error404')

const Home = ()=>import('../components/Home')
//Features 
const Appointments = ()=>import('../components/Appointments/Main')
const SymptomChecker = ()=>import('../components/SymptomChecker/Main')
const Prescriptions = ()=>import('../components/Prescriptions/Main')
const EmergencyMap = ()=>import('../components/EmergencyMap/leafMain')

Vue.use(Router)

export default new Router({
  routes: [
    //Login
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: async (to, from, next)=>{
        var str = await store;
        if(str.getters.token) next({name: 'App'})
        else next() 
      }
    },
    //Signup
    {
      name: 'signup',
      path: '/signup',
      component: SignUp
    },
    // User Activation
    {
      path: '/activate',
      component: ActivateUser,
      children:[
        {path: '/', component: Error404, beforeEnter: (to, from, next) => {
          next({name: 'Login'})
        }},
        {path: ':token', component: Activator}
      ]
    },
    // App
    {
      path: '/',
      component: App,
      beforeEnter: async (to, from, next) => {
          var str = await store;
          if(!str.getters.token) next({name: 'Login'})
          else next() 
      },
      children:[
        {name: 'Home', path: '/', component: Home},
        {name: 'Appointments', path: '/appointments', component: Appointments},
        {name: 'Diagnosis', path: '/diagnosis', component: SymptomChecker},
        {path: '/diagnosis', redirect: 'Diagnosis'},
        {name: 'Prescriptions', path: '/prescriptions', component: Prescriptions},
        {name: 'EmergencyMap', path: '/emergency', component: EmergencyMap},

      ]
    }
  ],
  mode: 'history'
})
