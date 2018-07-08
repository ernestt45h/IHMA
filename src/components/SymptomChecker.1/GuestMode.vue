<template>
    <div v-if="isGuest" class="bg-info card row text-center">
        <div class="">
            <p>Guset Mode On</p>
            <button class="btn btn-danger" @click="turnOff">turn off</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'guest-mode',
    props: ['isGuest'],
    methods:{
        turnOff(){
            this.$emit('guestmodeoff', true)
            console.log('emmiting')
        }
    }
}
</script>

