<template>
    <div>
        <vs-button v-for="(choice, index) in item" :key="index"
        class="col-sm-12"
        vs-type="primary-flat" 
        :name="choice.id"
        @click="buttonClicked({
            id: choice.id,
            choice_id: 'present'
        })"
        >{{choice.name}}</vs-button>

    </div>
</template>

<script>
export default {
    name: 'single',
    props: ['item'],
    methods: {
        buttonClicked(payload){
            this.$emit('clicked', payload)
            console.log({
                type: 'g-single',
                options: this.item,
                choise: payload
            })
        }
    },
    created(){
        console.log(this.item)
    }
}
</script>
