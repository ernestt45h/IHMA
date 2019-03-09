<template>
    <div>
        <h1>Who is this check up for?</h1>
        <Row :gutter="6">
            <Col :xs="12">
                <Button @click="stateOther" type="info" size="large" long><p>Someone</p></Button>
            </Col>
            <Col :xs="12">
                <Button @click="stateSelf" type="info" size="large" long><p>Myself</p></Button>
            </Col>
        </Row>
        <navs @back="$router.push({name: 'DiagnosisIntro'})" :hasBack="true" next="Select an answer above"/>
    </div>
</template>
<script>
import navs from "../../../components/navigations/diagnosis";
export default {
    components:{navs},
    methods:{
        stateSelf(){
            let details = this.$store.getters['user/getDetails']
            if(!details.age || !details.gender){
                //Push to user profile 
                this.$router.push({ name: 'UserProfile'})
            }else{
                let age = Math.floor((new Date()- new Date(details.age.toDate()))/(60*60*24*365.25*1000))                
                let sex = details.gender
                // this.$store.commit('diagnosis/setMode', 'self')
                // this.$store.commit('diagnosis/setAge', age)
                // this.$store.commit('diagnosis/setGender', gender)
                this.$store.commit('diagnosis/setCurrent', {sex, age, mode: 'self', symptoms: []})

                let risk_factors = this.$store.getters['diagnosis/getRiskFactors']
                if(risk_factors.length > 0){
                    //Move to suggestions
                }else{
                    //Select risk factors
                }
            }
        },
        stateOther(){
            this.$store.commit('diagnosis/setMode', 'other')
            this.$router.push({name: 'DiagnosisUserGender'})
        }
    }
}
</script>

<style scoped>

    h1{
        text-align: center;
        margin-bottom: 7.2px;
    }

    .icon{
        font-size: 72px;
    }

    .card{
        text-align: center;
    }
</style>
