<template>
    <Row type="flex" justify="center">
        <Col :xs="22" >
            <level :triage="triage"/>
            <result :conditions="conditions"/>
            <summs />
        </Col>
    </Row>
</template>
<script>
import Level from './level'
import Result from './results'
import Summs from './summary'
import { isError } from 'util';
export default {
    components:{ Level, Result, Summs },
    data() {
        return {
            triage: '',
            isError: false,
            is_details: false,
            conditions: this.$store.getters['diagnosis/getCurrentConditions'],
        }
    },

    created(){
        this.$emit('loading', true)
        this.$store.dispatch('diagnosis/triage')
        .then((result) => {
            this.$emit('loading', false)
            this.triage = result
        }).catch((err) => {
            this.$emit('loading', false)
            this.isError = true
            // Todo Call modal
        });
        this.$emit('hide', true)
        // this.triage = {"triage_level":"emergency","serious":[{"id":"s_133","name":"Hypersensitivity to light, sounds, or smells","common_name":"Oversensitivity to light, sounds, or smells","is_emergency":false},{"id":"p_74","name":"Craniocerebral trauma","common_name":"Head injury","is_emergency":false}],"condition":{"id":"c_672","name":"Concussion","common_name":"Concussion","sex_filter":"both","categories":["Neurology"],"prevalence":"very_rare","acuteness":"acute","severity":"moderate","extras":{"hint":"Please visit a neurologist as soon as possible.","icd10_code":"S06.0"},"triage_level":"emergency"}}
    },

    beforeDestroy(){
        this.$emit('hide', false)
    }
}
</script>
<style scoped>
    h1{
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 7.2px;
    }

    p{
        font-size: 15px;
        margin-bottom: 14.4px;
    }

    .content{
        padding:10px
    }
</style>
