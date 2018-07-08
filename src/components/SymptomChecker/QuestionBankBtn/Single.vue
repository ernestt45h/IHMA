<template>
    <div>
        <vs-button 
        class="col-md-4"
        vs-type="primary-flat"
        v-for="choice in item"
        @click="buttonClicked(choice.id)"                                    
        :value="choice.id"
        :key="choice.id"
        >{{ choice.label }}</vs-button>
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
                type: 'single',
                options: this.item,
                choise: payload
            })
        }
    }
}
</script>

