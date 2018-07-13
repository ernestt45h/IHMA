<template>
    <vs-popup class="holamundo"  vs-title="Who is this diagnosis for?" :vs-active="active" @vs-cancel="active=false">
        <h1>
            <vs-button @click="isSomeone = true" vs-type="warning-line-down">Someone</vs-button>
            <vs-button vs-type="success-line-down" @click="getUser" class="pull-right">Myself</vs-button>
        </h1> 
        <vs-popup vs-title="Details" :vs-active="isSomeone" @vs-cancel="isSomeone=false">
            <vs-row vs-w="12">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                    <vs-select 
                        id="gender-select"
                        label="Gender"
                        v-model="gender"
                        :options="gender_options"
                        ></vs-select>
                        <vs-input
                        vs-type="number"
                        vs-placeholder="Age"
                        v-model="age"/>
                </vs-col>
            <vs-button @click="setSomeone" vs-type="success-relief" class="pull-right"><i class="fa fa-check"></i></vs-button>
                
            </vs-row>
        </vs-popup>
    </vs-popup>
</template>

<script>
export default {
    name: 'set-someone',
    watch:{
        active(val){
            this.active = val
            if(!val){
                this.$emit('canceled')
            }
        }
    },
    props: ['active'],
    data(){
        return {
            age: '',
            gender: 'male',
            isSomeone: false,
            gender_options: [
                    {text: 'Male', value: 'male'},
                    {text: 'Female', value: 'female'},
                    {text: 'W\'ont say', value: 'both'},
                ]
        }
    },
    methods:{
        setSomeone(){
            this.isSomeone = false
            this.$emit('genderAgeSetted', {
                age: this.age,
                gender: this.gender,
                type: 'guest'
            })
        },

        getUser(){
            
        }
    }
}
</script>

