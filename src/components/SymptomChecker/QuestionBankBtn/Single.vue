<template>
    <div>
        <button 
        class="btn btn-info col-lg-12"
        type="button"  
        v-for="choice in item"
        @click="buttonClicked(choice.id)"                                    
        :value="choice.id"
        :key="choice.id"
        >{{ choice.label }}</button>
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
    }
}
</script>

