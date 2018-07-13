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
import Socket from 'socket.io-client'

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
    
  },
  mounted() {
    //Socket io connection using ID
    // var io = Socket.connect(host.ihma)

    // io.on('who', data=>{
    //   console.log(this.$store.getters.user.username)
    //   io.emit('user', this.$store.getters.user.username)
    // })

    // io.on('message', data=>{
    //   console.log(data)
    //   this.$vs.notify({
    //     text: data,
    //     color: 'warning'
    //   })
    // })
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
