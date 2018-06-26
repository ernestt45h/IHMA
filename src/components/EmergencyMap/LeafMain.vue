<template>
    <div>
        <div id="emap"></div>
    </div>
</template>
<script>

import {bus} from '../../main'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import host from '../../../config/host'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
    name: 'emap',
    data(){
        return{
            map: '',
            self: [ 5.5426563, -0.2057772 ],
            marker: '',
            circle: '',
            hospitals: ''
        }
    },
    watch:{
        // when the cordinates are changed it should update the position of the user
        self: (val)=>{
            if(val){
                this.updateLocation(val.coords)
            }
        }
    },
    computed:{
        hospitalsList(){
            
        }
    },
    methods:{
        addHospital(coords){
            L.marker(coords).addTo(this.map);
        },

        //updates users location
        updateLocation(val){
            console.log(val)
            let newloc = new L.LatLng(val.lat, val.lng)
            this.map.panTo(newloc);
            this.map.removeLayer(this.marker)
            this.marker.setLatLng(newloc)
            //this.map.setView(new L.latlng(val.latitude, val.longitude),8) 
        },

        onLocationFound(e) {
            var radius = e.accuracy;
            console.log('location', e)
            let coords = e.latlng
            let newloc = new L.LatLng(coords.lat, coords.lng)
            let url = host.ihma +`/hospital/geo?lng=${coords.lat}&lat=${coords.lng}`
            axios.get(url).then(doc=>{
                this.hospitals = doc.data
                for(let hospital of this.hospitals){
                    console.log(hospital.geolocation.coordinates)
                    this.addHospital(hospital.geolocation.coordinates)
                }
            })
            var circle = L.circle(newloc, {
                color: '#5bc',
                fillColor: '#5bc',
                fillOpacity: 0.3,
                radius: 3000
            }).addTo(this.map);
            this.map.removeLayer(this.marker)
            this.marker.setLatLng(newloc).addTo(this.map)
            this.marker.bindPopup('You are within this location').openPopup()
        }
    },
    created(){
       
    },

    mounted(){

        /**
         * wanted to initialize the map in the created hook but it seems it doesn't work
         * so i used it whrn the component is about to be mounted instead
         * the map is passed inside the this.map variable
         */
        this.map = L.map('emap').setView(this.self, 12);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXJuZXN0dDQ1aCIsImEiOiJjamlidTg4eDQwMXFxM3BsdTJxdmhrZGt0In0.Dg_TRybkaoJAF3GrjOoRBw', {
            maxZoom: 17,
            attribution: '<a href="oneinvader.com">OneInvader</a>',
            id: 'mapbox.streets'
        }).addTo(this.map);

        this.marker = L.marker(this.self).addTo(this.map);


        this.map.on('locationfound', this.onLocationFound);
        this.map.on('locationerror', (e)=>{
            alert(e.message)
        });

        this.map.locate({setView: true, maxZoom: 14});
    }
}
</script>

<style scoped>
    #emap{
        min-height: 480px;
        z-index: 0;
    }
</style>
