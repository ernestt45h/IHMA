<template>
    <div>
        <button 
        class="btn btn-info col-sm-12"
        type="button" 
        :name="item.id"
        @click="newEvedence({
            id: item.id,
            choice_id: 'present'
        })"
        >{{item.name}}</button>

        <button class="btn btn-info col-sm-12"
         @click="newEvedence({
            id: item.id,
            choice_id: 'unknown'
        })"             
        >
        Don't know
        </button>
    </div>
</template>

<script>
export default {
    name: 'single',
    props: ['item'],
    methods: {
        buttonClicked(payload){
            this.$emit('clicked', payload)
        }
    },
    created(){

    }
}
</script>
