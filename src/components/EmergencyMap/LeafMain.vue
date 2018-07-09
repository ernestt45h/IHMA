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
    iconUrl: require('../../assets/1x/user_marker.png'),
    iconRetinaUrl: require('../../assets/2x/user_marker@2x.png'),
    iconSize: [40,60],
    popupAnchor: [-3,-70],
    iconAnchor: [0,60],
    shadowUrl: require('../../assets/1x/shadow_marker.png'),
    shadowSize: [20,10],
    shadowAnchor: [-10,0]
});

export default {
    name: 'emap',
    data(){
        return{
            map: '',
            user_coords: [ 5.6037168, -0.1869644 ],
            user_icon: L.icon({
                iconUrl: require('../../assets/1x/user_marker.png'),
                iconRetinaUrl: require('../../assets/2x/user_marker@2x.png'),
                iconSize: [40,60],
                popupAnchor: [-3,-70],
                iconAnchor: [0,60],
                shadowUrl: require('../../assets/1x/shadow_marker.png'),
                shadowSize: [20,10],
                shadowAnchor: [-10,0]
            }),
            hospital_icon: L.icon({
                    iconUrl: require('../../assets/1x/hospital_marker.png'),
                    iconRetinaUrl: require('../../assets/2x/hospital_marker@2x.png'),
                    iconSize: [40,60],
                    popupAnchor: [21,-70],
                    iconAnchor: [0,70],
                    shadowUrl: require('../../assets/1x/shadow_marker.png'),
                    shadowSize: [20,10],
                    shadowAnchor: [-10,0]
            }),
            marker: '',
            circle: '',
            hospitals: ''
        }
    },
    watch:{
        // when the cordinates are changed it should update the position of the user
        user_coords: (val)=>{
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
        addHospital(hospital){
            console.log(hospital)
            let h = L.marker(hospital.geolocation.coordinates, {icon: this.hospital_icon}).addTo(this.map);
            h.bindPopup(hospital.name)
            h.on('click',function(){
                this.openPopup()
            })
            
        },

        getHospitals(coords,radius = 15000){
            console.log('getting hospitals')            
             let url = host.ihma +`/hospital/geo?lng=${coords.lat}&lat=${coords.lng}&radius=${radius}`
             axios.get(url).then(doc=>{
                console.log('done getting hospitals', doc.data)            
                this.hospitals = doc.data
                for(let hospital of this.hospitals){
                    this.addHospital(hospital)
                }
            })
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
            let coords = e.latlng
            //let coords = {lat: 5.5426563, lng: -0.2057772}
            let newloc = new L.LatLng(coords.lat, coords.lng)
            console.log('location', coords)

            this.getHospitals(coords)
            var circle = L.circle(newloc, {
                color: '#5bc',
                fillColor: '#5bc',
                fillOpacity: 0.3,
                radius: 10000
            }).addTo(this.map);
            this.map.removeLayer(this.marker)
            this.marker.setLatLng(newloc).addTo(this.map)
        }
    },
    created(){
       
    },

    mounted(){

        /**
         * wanted to initialize the map in the created hook but it seems it doesn't work
         * so i used it when the component is about to be mounted instead
         * the map is passed inside the this.map variable
         */
        this.map = L.map('emap').setView(this.user_coords, 12);
        
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXJuZXN0dDQ1aCIsImEiOiJjamlidTg4eDQwMXFxM3BsdTJxdmhrZGt0In0.Dg_TRybkaoJAF3GrjOoRBw', {
            maxZoom: 17,
            attribution: '<a href="http://oneinvader.com">OneInvader</a>',
            id: 'mapbox.streets'
        }).addTo(this.map);

        
        this.marker = L.marker(this.user_coords, {draggable: true, title: "your location", icon: this.user_icon}).addTo(this.map);

        this.map.on('locationfound', this.onLocationFound);
        this.map.on('locationerror', (e)=>{
            this.map.locate({setView: true, maxZoom: 12});
        });

        //this.map.on('click', e=>console.log(e))
        this.map.locate({setView: true, maxZoom: 12})

        console.log('app name', navigator.platform)
    }
}
</script>

<style scoped>
    #emap{
        min-height: 480px;
        z-index: 0;
    }
    
</style>
