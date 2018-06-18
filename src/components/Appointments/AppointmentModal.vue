<template>
    <div v-if="appointment">
        <h3>Meeting Dr. {{ fullName | captilize}}
            at {{ appointment.hospital.name | captilize}}</h3>
        <br>
        <h5>on <b class="text-info">{{appointment.date.start | simpleDate}} </b>for your {{ appointment.description | captilize}}</h5>
        <div class="modal-footer">
            <button type="button" data-dismiss="modal" @click="confirmCancel(appointment._id)" class="btn btn-danger">Cancel Appointment</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: "app-modal",
        props: {
            appointment :  {
                type: Object,
            }
        },
        data(){
            return{
                
            }
        },
        computed:{
            fullName: function(){
                if(typeof this.appointment !== undefined){
                    var name = this.appointment.doctor.name
                    if(!name.other)
                    return name.last + ' ' + name.first
                    else
                    return name.last + ' ' + name.first + ' ' + name.other
                }
            }
        },
        methods: {
            confirmCancel: function(id){
                this.$emit('confirmed', id)
            }
        },
        created(){
        }
    }
</script>
<style></style>