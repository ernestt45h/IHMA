<template>
    <div>
        <div class="clearfix"></div>
            <div>
                <button 
                class="btn btn-info col-sm-4"
                type="button" 
                :name="item.id"  
                v-for="choice in item.choices"
                @click="buttonClicked({
                    id: item.id,
                    choice_id: choice.id
                })"                                    
                :value="choice.id"
                :key="choice.id"
                >{{ choice.label }}</button>
            </div>
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

