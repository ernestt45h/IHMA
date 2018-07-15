
class GeoLocation{


// get_hospital
    async get_closest_hospital(coords, radius = 1000){
        return this.get_hospitals(coords, radius).then(coords=>{
            return coords[0]
        })
    }

// get_hospitals
    get_hospitals(coords, radius = 1000){
        const Hospital = require('../database/Hospitals')

        //Sets
        let point = {
            type: 'point', 
            coordinates: [parseFloat(coords.lng), parseFloat(coords.lat)]
        }

        Hospital.aggregate([{
            '$geoNear' : {
                'near': point,
                'spherical': true,
                'distanceField': 'dist',
                'maxDistance': radius || 5000
            }
        }]).then(doc=>{
            if(doc) return doc
            else {
                this.get_closest_hospital(coords, radius * 2)
            }
        })
    }
// get_pharmacy
        async get_closest_pharmacy(coords, radius = 1000){
            return this.get_pharmacies(coords, radius).then(coords=>{
                return coords[0]
            })
        }

// get_pharmacys
        get_pharmacies(coords, radius = 1000){
        const Pharmacy = require('../database/Pharmacy')

        //Sets
        let point = {
            type: 'point', 
            coordinates: [parseFloat(coords.lng), parseFloat(coords.lat)]
        }

        Pharmacy.aggregate([{
            '$geoNear' : {
                'near': point,
                'spherical': true,
                'distanceField': 'dist',
                'maxDistance': radius || 5000
            }
        }]).then(doc=>{
            if(doc) return doc
            else {
                this.get_closest_pharmacy(coords, radius * 2)
            }
        })
    }


// get_paramedics
// user_last_location

}