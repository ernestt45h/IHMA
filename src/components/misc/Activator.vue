<template>
    <h1></h1>
</template>
<script>
import axios from 'axios'
import host from '../../../config/host'
export default {
    name: 'user-activation',
    data(){
        return{
            refresher: ''
        }
    },
    created(){
        this.activate()
    },
    methods:{
        activate(){
            this.$vs.loading()
            console.log(this.$route.params);
            
            var token = this.$route.params.token
            axios.get(host.ihma + '/activate/' + token).then((doc)=>{
                console.log(doc)
                this.$vs.loading.close()
                
            }).catch((err)=>{
                console.log(err)
                this.$vs.loading.close()
                this.$vs.alert({
                    title:'Connection Error',
                    text:'Check your internet settings and try again',
                    textConfirm:'Retry',
                    color:'danger',
                    confirm:()=>{
                        this.activate()
                    },
                })
            })
        }
    }
}
</script>
