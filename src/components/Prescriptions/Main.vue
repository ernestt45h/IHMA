<template>
    <div class="container grid-info">
    <div class="row">
        <div class="col-md-4">
            <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Morning</a>
            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Afternoon</a>
            <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Evening</a>
            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Other</a>
            </div>
        </div>
        <div class="col-md-8">
            <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
            <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
            <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
            <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
            </div>
        </div>
    </div>
    <button class="btn" @click="testloader">loader</button>
    </div>
</template>

<script>
import axios from 'axios'
import host from '../../../config/host'

export default {
    name:'prescriptions',
    data(){
        return{
            prescriptions: '',
        }
    },
    methods:{
        testloader(){
            this.$vs.loading({color: 'success'})
            setTimeout(()=>{
                this.$vs.loading.close()
            }, 4000)
        }
    },
    created(){
        this.$vs.loading({color: 'success'})
        axios.get(host.ihma).then(()=>{
            console.log('hello')
            this.$vs.loading.close()
            
        }).catch(()=>{
            console.log('not')    
            this.$vs.loading.close()
        })
    }
}
</script>


<style scoped>
.prescriptions{
    border-right: 1px #333 solid; 
}
</style>

