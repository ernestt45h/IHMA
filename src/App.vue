<template>
  <div id="app">
    <side-nav></side-nav>
    <section class="wrapper scrollable">
      <top-nav></top-nav>
      <div class="spacer">
        <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view/>
            </keep-alive>
       </transition>
      </div>
    </section>
  </div>
</template>

<script>
const TopNav = ()=>import('./components/navbar/top')
const SideNav = ()=>import('./components/navbar/Sidebar')
import axios from 'axios'
import host from '../config/host'

export default {
  name: 'App',
  watch:{
    '$store.getters.user' (val){
      if(!val) {
        console.log('Logging out now')
        this.$router.push('login')
        }
    },
  },
  components:{TopNav,SideNav},
  data(){
    return{
      username: ''
    }
  },
  methods:{
    getUser(){
      axios.get(host.ihma+'/user', {headers: {
        Authorization: 'bearer '+ this.$store.getters.token
      }})
      .then(doc=>{
          if(doc.status !== 200){
             this.$vs.alert({
              title: 'Account error',
              text: `<h3 class="text-danger text-capitalize">
                there seems to be an account error, please try logging out and back in
                </h3>`,
              color: 'danger',
              confirm:()=>{
                this.$store.dispatch('logout')
              },
              //TODO click to logout user when x button is clicked
              cancel:()=>{
                this.$store.dispatch('logout')
              }
            })
          }
          else
            this.$store.commit('user', doc.data)
      }).catch(err=>{
        this.$vs.notify({
          text: '<h4 class="text-capitalize">Connection problem</h4>',
          color: 'danger'
        })
      })
    }
  },
  created() {
    if(this.$store.getters.isUser){
      this.getUser()
    }

    console.log(this.$router)
  },
}
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .spacer{
    margin-top: 20px;
  }
</style>
