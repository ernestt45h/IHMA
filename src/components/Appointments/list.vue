<template>
    <div id="up-comming" class="col-sm-12 col-md-5 col-xl-7 col-lg-6">
        <div class="card">
            <div class="card-header bg-info">
                <h1 class="text-light">Appointments</h1>
            </div>
            <div>
                <keep-alive>
                    <ul class="list-group">
                        <div v-if="!events">
                            <h2 class="text-info text-center">You currnetly have no appointments</h2>
                        </div>
                        <div
                                v-else
                                v-for="e in events"
                                class="list-group-item"
                                :key="e._id">

                            <h4 class="col s6"> {{ e.description | uppercase}}</h4>
                            <br>
                            <h6 class="col s6">With Dr.
                                {{
                                e.doctor.name.first + ' ' +
                                e.doctor.name.last
                                | uppercase }}
                                at {{ e.hospital.name }}
                                on {{ e.date.start | simpleDate}}
                            </h6>
                            <button
                                    @click="showAlert(e)"
                                    class="btn align btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#cancelAppointment">
                                <i class="fa fa-times"></i> cancel appointment
                            </button>
                        </div>
                        
                    </ul>
                </keep-alive>
            </div>
            <div class="card-footer">
                <h6 class="pull-right"><button class="btn btn-success"><i class="fa fa-plus"></i></button></h6>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'appointment-list',
    props: ['events']
}
</script>