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
    }
  },
  components:{TopNav,SideNav},
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
