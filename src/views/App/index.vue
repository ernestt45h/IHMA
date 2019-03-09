<template>
<div id="app">
    <template v-if="loading">
        <splash :loading="loading"/>
    </template>
    <template v-else>
        <side-nav></side-nav>
        <section class="wrapper scrollable">
        <top-nav></top-nav>
        <div class="spacer">
            <slide-y-up-transition mode="out-in">
                <!-- <keep-alive> -->
                    <router-view/>
                <!-- </keep-alive> -->
            </slide-y-up-transition>
        </div>
        </section>
    </template>
</div>
</template>

<script>
const TopNav = ()=>import('../../components/navbar/top')
const SideNav = ()=>import('../../components/navbar/Sidebar')
import Splash from '../Splash'

export default {
    name: 'App',
    components:{TopNav,SideNav, Splash},
    data(){
        return{
            loading: true,
            uid: this.$store.getters['user/getUID']
        }
    },
    methods:{
        
    },
    mounted() {
        console.log('asadsasd');
        
        this.$store.dispatch('user/fetchDetails')
        .then((details) => {
            this.loading = false
            if(!details){
                this.$router.push({name: 'UserProfile'})
                this.$Message.info({
                    content: 'I need just a little bit of information from you',
                    duration: 10,
                    closable: true
                })
            }
            console.log(details)
        }).catch((err) => {
            console.log(err)
            this.loading = false            
        });
    },
}
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');

    *{
        font-family: 'Montserrat', sans-serif;
    }
    
    .spacer{
        background: #fff;
        /* background: url('../../assets/svg/SVG/right.svg'), url('../../assets/svg/SVG/left.svg'), #fff; */
        /* background-size: 72px;
        background-repeat: no-repeat;
        background-position: top right, bottom left; */
    }
</style>
