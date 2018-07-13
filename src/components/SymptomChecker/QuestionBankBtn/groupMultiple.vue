<template>
    <div>
        <button 
        @click="addEvidence(choice)" 
        :class="{
            'btn-secondary': evidences[index].choice_id != 'present',
            'btn-primary': evidences[index].choice_id == 'present'
        }" 
        class="btn col-12"
        v-for="(choice, index) in item"
        :key="index"> {{choice.name}}</button>
        <button @click="next" class="btn btn-primary">Next</button>
    </div>
</template>
<script>

export default {
    name: 'group-multiple',
    props:['item'],
    data(){
        return{
            evidences: []
        }
    },
    methods:{
        addEvidence(choice){
            console.log(choice, this.evidences)
            for(let index in this.evidences){
                if(this.evidences[index].id == choice.id){
                    if(this.evidences[index].choice_id == 'present'){
                        this.evidences[index].choice_id = 'absent'
                    }else this.evidences[index].choice_id = 'present'
                }else{
                    console.log('nope')                    
                }
            }
        },
        next(){
            this.$emit('clicked', this.evidences)
            console.log({
                type: 'm-single',
                options: this.item,
                choise: payload
            })
        }
    },
    created(){
        for(let item of this.item){
            this.evidences.push({
                id: item.id,
                choice_id: 'absent'
            })
        }
    }
}

</script>
<style scoped>
    .btn-primary:focus{
        background: #5bc0de;
    }
</style>

