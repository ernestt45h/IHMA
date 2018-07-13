<template>
    <div id="mmap"></div>
</template>
<script>

import mb from 'mapbox-gl'

mb.accessToken = require('../../../config/host').default.mapbox_api

export default {
    name:'mmap',
    data(){
        return{
            map: ''
        }
    },
    mounted(){

        navigator.geolocation.getCurrentPosition((pos)=>{
            console.log(pos.coords)
            
            pos = pos.coords

            this.map = new mb.Map({
            container: 'mmap',
            style: 'mapbox://styles/mapbox/streets-v10',
            attributionControl: true,
            center: [pos.latitude, pos.longitude],
            zoom: 8
        });
        })

    }
}
</script>

<style scoped>
    #mmap{
        min-height:450px; 
    }
</style>

