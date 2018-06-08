const host = require('./host')
module.exports = {
    patient : [
        // Appointments
        {
            name : "Appointments",
            sub_name: 'appointments',
            access_point : host.name + '/appointments',
            actions: ['create', 'read', 'update', 'delete'],
            target: "self",
            fa_icon: "fa fa-calendar-plus-o",
        },
        // Symptom Checker
        {
            name : "Diagnosis",
            sub_name: 'diagnosis',            
            access_point : host.name + '/diagnosis',
            actions: ['create', 'read'],
            target: "self",
            fa_icon: 'fa fa-stethoscope'
        },
        // Prescriptions        
        {
            name : "Prescriptions",
            sub_name: "prescriptions",
            access_point : host.name + '/prescriptions',
            actions: ['read'],
            target: "self",
            fa_icon: 'fa fa-list-ol'
        }
    ],
    developer: [
         // Appointments
         {
            name : "Appointments",
            sub_name : "appointments",
            access_point : host.name + '/appointments',
            actions: ['create', 'read', 'update', 'delete'],
            target: "self",
            fa_icon: "fa fa-calendar-plus-o"
        },

        {
            name : "Appointments",
            sub_name : "appointments",
            access_point : host.name + '/appointments',
            actions: ['read', 'update', 'delete'],
            target: "patient",
            fa_icon: "fa fa-calendar-plus-o"
        },

        // Symptom Checker
        {
            name : "Symptom Checker",
            sub_name : "symptom_checker",            
            access_point : host.name + '/symptom-checker',
            actions: ['create', 'read'],
            target: "self",
            fa_icon: 'fa fa-stethoscope'
        },

        {
            name : "Symptom Checker",
            sub_name : "symptom_checker", 
            access_point : host.name + '/symptom-checker',
            actions: ['create', 'read'],
            target: "patient",
            fa_icon: 'fa fa-stethoscope'
        },

        // Prescriptions        
        {
            name : "Prescriptions",
            sub_name : "prescriptions", 
            access_point : host.name + '/prescriptions',
            actions: ['create','read','update','delete'],
            target: "self",
            fa_icon: 'fa fa-list-ol'
        }
    ]
}