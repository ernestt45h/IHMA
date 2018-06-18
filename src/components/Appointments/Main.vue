<template>
    <div class="container">
        <div class="row">
            <calendar class="calendar col-sm-12 col-md-7 col-xl-5 col-lg-6 " :events="events"></calendar>
            <list  :events="events"></list>
        </div>
        <!-- Cancel Appointment modal -->
        <div class="modal fade" id="cancelAppointment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h4 class="modal-title" id="exampleModalLabel">Are you sure you want to delete this appointment ?</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <app-modal :appointment="cancelingAppointment" @confirmed="cancelAppointment($event)"  class="modal-body"></app-modal>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //import {host} from "../../config/host";
    import List from "./list"
    import Calendar from "./calendar.vue";
    import AppModal from "./AppointmentModal.vue"
    import axios from "axios"

    export default {
        name: 'appointments',
        components:{Calendar, List, AppModal},
        data(){
            return{
                events: '',
                cancelingAppointment: {
                    doctor: {
                        name: {
                            first: '',
                            last: '',
                            other: '',
                        }
                    },
                    hospital: {
                        name: ''
                    },
                    description: '',
                    date: {
                        start: ''
                    }
                },
                token: this.$store.getters.token
            }
        },
        methods:{
            showAlert(e){
                console.log(e)
                this.cancelingAppointment = e

            },
            viewAppointment(event){
                this.desc.raw = event
                console.log(this.desc.raw.doctor.name.first)
            },
            cancelAppointment(id){
                bus.$emit('loading', true)
                axios.delete(host.name + '/appointment/' + id, {
                    headers: {
                        Authorization: 'bearer ' + this.token
                    }
                })
                    .then(()=>{
                        for (var i = 0; i < this.events.length; i++){
                            if(this.events[i]._id === id){
                                this.events.splice(i)
                            }
                        }
                        bus.$emit('loading', false)
                    })
            },

        },
        computed:{
            searched(){
                console.log(this.searchApp)
            }
        },
        created(){
            /*bus.$emit('loading', true)
            axios.get( host.name+'/appointment', {
                headers: {
                    Authorization: 'Bearer '+ this.token
                }
            })
                .then( e => {
                    console.log(e.data);
                    this.events = e.data
                    bus.$emit('loading', false)
                })
            */
        }

    }
</script>
<style scoped>

    #add-appointment{
        position: absolute;
        bottom: 0;
        right: 0;
        margin-right: 20px;
        margin-bottom: 20px;
        font-size: 20px;
    }

    .card{
        margin: 0 5px;
    }

    .card:hover{
        cursor: default;
    }

    .bg-green{
        background: #1abc9c
    }
</style>

