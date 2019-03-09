import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import App from '@/App'
// const Login = ()=>import('../components/forms/login')
// const SignUp = ()=>import('../components/forms/signup')
// const Store = ()=>import('../store')
// const store = Store().then((store)=>{
//   return store.default.store
// })
// const ActivateUser = ()=>import('../components/misc/UserActivation')
// const Activator = ()=>import('../components/misc/Activator')
// const Error404 = ()=>import('../components/misc/Error404')

// const Home = ()=>import('../components/Home')
// //Features 
// const Appointments = ()=>import('../components/Appointments/Main')
// const SymptomChecker = ()=>import('../components/SymptomChecker/Main')
// const Prescriptions = ()=>import('../components/Prescriptions/Main')
// const EmergencyMap = ()=>import('../components/EmergencyMap/leafMain')
// //Permissions Home
// const Permissions = ()=>import('../components/Permissions/Main')
// const UserPermision = ()=>import('../components/Permissions/User')
// const HomePermisson = ()=>import('../components/Permissions/')
// const PermissionsMod = ()=>import('../components/Permissions/Permissions')

// const old_routes =[
//   //Login
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
//     beforeEnter: async (to, from, next)=>{
//       var str = await store;
//       if(str.getters.token) next({name: 'App'})
//       else next() 
//     }
//   },
//   //Signup
//   {
//     name: 'signup',
//     path: '/signup',
//     component: SignUp
//   },
//   // User Activation
//   {
//     path: '/activate',
//     component: ActivateUser,
//     children:[
//       {path: '/', component: Error404, beforeEnter: (to, from, next) => {
//         next({name: 'Login'})
//       }},
//       {path: ':token', component: Activator}
//     ]
//   },
//   // App
//   {
//     path: '/',
//     component: App,
//     beforeEnter: async (to, from, next) => {
//         var str = await store;
//         if(!str.getters.token) next({name: 'Login'})
//         else next() 
//     },
//     children:[
//       {name: 'Home', path: '/', component: Home},
//       {name: 'Appointments', path: '/appointments', component: Appointments},
//       {name: 'Diagnosis', path: '/diagnosis', component: SymptomChecker},
//       {path: '/diagnosis', redirect: 'Diagnosis'},
//       {name: 'Prescriptions', path: '/prescriptions', component: Prescriptions},
//       {name: 'EmergencyMap', path: '/emergency', component: EmergencyMap},
//       {path: '/developer', component: Permissions,
//         children:[
//           {name:'HomePermission', path:'/', component: HomePermisson},
//           {name:'UserPermission', path:'user', component: UserPermision},
//           {name: 'PermissionsMod', path: 'permissions', component: PermissionsMod}
//         ]
//       },
      

//     ]
//   }
// ]

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: _=>import(/* webpackChunkName: "Login" */ '../views/Auth/Login.vue'),
      beforeEnter: (to, from, next) => {
        if(!store.getters['user/isAuth'])
          next()
        else next({name: 'Dashboard'})
      }
    },
    {
      path: '/',
      component: _=>import( /* webpackChunkName: "App" */ '../views/App'),
      children:[
        {path: '/', name: 'Dashboard', component: _=>import(/* webpackChunkName: "Dash" */  '../views/App/Dashboard')},
        {path: '/user-profile', name: 'UserProfile', component: _=>import( /* webpackChunkName: "UserProfile" */ '../views/App/UserProfile')},
        {path: '/diagnosis', component: _=>import( /* webpackChunkName: "Diagnosis" */ '../views/App/Diagnosis'), children: [
          {path: '/', name: 'DiagnosisIntro', component: _=>import('../views/App/Diagnosis/Intro.vue')},
          {path: 'terms-and-conditions', name: 'DiagnosisTC', component: _=>import('../views/App/Diagnosis/T&C.vue')},
          {path: 'profile-selection', name: 'DiagnosisProfileSelection', component: _=>import('../views/App/Diagnosis/ProfileSelection.vue')},
          {path: 'user-age', name: 'DiagnosisUserAge', component: _=>import('../views/App/Diagnosis/Age.vue')},
          {path: 'user-gender', name: 'DiagnosisUserGender', component: _=>import('../views/App/Diagnosis/Sex.vue')},
          {path: 'symptoms', name: 'DiagnosisSymptoms', component: _=>import('../views/App/Diagnosis/NLP.vue')},
          {path: 'risk_factors', name: 'DiagnosisRiskFactors', component: _=>import('../views/App/Diagnosis/RiskFactors.vue')},
          {path: 'suggest', name: 'DiagnosisSuggest', component: _=>import('../views/App/Diagnosis/Suggestion.vue')},
          {path: 'diagnose', name: 'DiagnosisDiagnose', component: _=>import('../views/App/Diagnosis/Diagnose')},
          {path: 'triage', name: 'DiagnosisTriage', component: _=>import('../views/App/Diagnosis/Triage')},
        ]},
      ],
      beforeEnter: (to, from, next) => {
        if(store.getters['user/isAuth'])
          next()
        else next({name: 'Login'})
      }
    }
  ],
  mode: 'history'
})
