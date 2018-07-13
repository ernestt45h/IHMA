<template>
    <div class="container grid-info">
    <ul class="nav nav-pills justify-content-center">
        <li class="nav-item">
            <button class="nav-link" @click="time = 'morning'; activepill = 0 " :class="{active: time == 'morning'}" type="button">Morning</button>
        </li>
        <li class="nav-item">
            <button class="nav-link " @click="time = 'noon'; activepill = 0" type="button">Noon</button>
        </li>
        <li class="nav-item">
            <button class="nav-link " @click="time = 'evenning'; activepill = 0" type="button">Evening</button>
        </li>
        <li class="nav-item">
            <button class="nav-link disabled" :class="{active: time == 'interval'}"  @click="time = 'interval'; activepill = 0" type="button">Others</button>
        </li>
    </ul>
    <div class="card col-12" v-if="isloaded">
        <ul class="list-group" v-if="showPrecription(time)[0]">
            <li v-for="(item, index) in showPrecription(time)" :key="index" class="list-group-item" >
                <a :href="'#'+index" :id="index" class="list-group-item list-group-item-action flex-column align-items-start" 
                    :class="{'active' : activepill == index}" @click="activepill = index">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">{{item.name | captilize}}</h3>
                        <small>Take {{item.intake}} tablets</small>
                    </div>
                    <p class="mb-4 text-warning text-capitalize">{{item.description}}
                    </p>
                    <div class="mb-1 text-warning text-capitalize" v-if="item['interval-description']">{{item['interval-description']}}</div>
                    <small>Keep Taking Till: <i class="fa fa-clock-o"></i> {{item.duration | simpleDate}} 
                        <template v-if="item.interval">@ {{item.interval | captilize}} hr intervals</template>
                    </small>
                </a>
            </li>
        </ul>
        <div v-else class="card-body text-center">
             <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                    <h1 class="mb-1"> <i class="fa" :class="error_icon"></i> {{error}}</h1>
                    </div>
              </a>
              <button @click="loadPrescriptions" v-if="reload" class="btn btn-danger"><i class="fa fa-refresh"></i> Reload</button>
        </div>
    </div>
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
            time: 'morning',
            activepill: 0,
            isloaded: false,
            error: 'Sorry, No prescriptions at this time of the day',
            error_icon: 'fa-frown-o',
            reload: false
        }
    },
    computed:{
        
    },
    methods:{

        timeCalculator(item){
            if(item.time == 'interval') return `every ${item.interval} hr intervals`
        },

        showPrecription(time){
            let items = []
            for(let prescription of this.prescriptions){
                if (prescription.time == time) items.push(prescription)  
            }
            return items
        },

        testloader(){
            this.$vs.loading({color: 'success'})
            setTimeout(()=>{
                this.$vs.loading.close()
            }, 4000)
        },

        loadPrescriptions(){
            this.$vs.loading({color: 'success'})
            axios.get(host.ihma+ '/prescription').then((doc)=>{
                this.prescriptions = doc.data 
                console.log(this.prescriptions)
                this.$vs.loading.close()
                this.isloaded = true
            }).catch(err=>{
                console.log(err)    
                this.$vs.loading.close()
                this.error_icon = 'fa-globe'
                this.error = 'Connection Error'
                this.reload = true
                this.isloaded = true
            })
        }
    },
    created(){
        this.loadPrescriptions()
    }
}
</script>


<style scoped>
.prescriptions{
    border-right: 1px #333 solid; 
}

</style>

