<template>
    <div>
        <div id="emap"></div>
    </div>
</template>
<script>

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
    name: 'emap',
    data(){
        return{
            map: ''
        }
    },
    watch:{
        self: (val)=>{
            if(val){
                this.updateLocation(val.coords)
            }
        }
    },
    methods:{
        updateLocation(val){
            this.map.setView(new L.latlng(val.latitude, val.longitute),8) 
        }
    },
    created(){
        if ("geolocation" in navigator) {
            console.log('geo')
            navigator.geolocation.getCurrentPosition(
                position=>{
                    this.updateLocation(position.coords)
                },
                err=>{
                    this.map = L.map('emap').setView([51.505, -0.09], 13);
                }
            )
        } else {
            console.log('non geo')
        }
    },

    mounted(){
        

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXJuZXN0dDQ1aCIsImEiOiJjamlidTg4eDQwMXFxM3BsdTJxdmhrZGt0In0.Dg_TRybkaoJAF3GrjOoRBw', {
            maxZoom: 17,
            attribution: '',
            id: 'mapbox.streets'
        }).addTo(this.map);

        var marker = L.marker([51.5, -0.09]).addTo(this.map);

        var circle = L.circle([51.5, -0.09], {
            color: '#5bc',
            fillColor: '#5bc',
            fillOpacity: 0.5,
            radius: 35
        }).addTo(this.map);

        circle.bindPopup("I am here.").openPopup()

        this.map.on('click', this.tester);
        
    }
}
</script>

<style scoped>
    #emap{
        min-height: 480px;
        z-index: 0;
    }
</style>
