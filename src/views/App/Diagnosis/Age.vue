<template>
    <div>
        <Row type="flex" justify="center">
            <h1>Please select {{person}} age</h1>
            <Col :xs=24>
                <Row type="flex" justify="center">
                    <p>{{age}}<span>yrs</span></p>            
                </Row>            
            </Col>
        </Row>
            <Slider :min="15" :max="120" v-model="age"></Slider>
        <Row type="flex" justify="space-around">
            <Col>
                <Button @click="age--" class="btn" size="large" shape="circle" icon="md-remove"></Button>
            </Col>
            <Col>
                <Button @click="age++" class="button" size="large" shape="circle" icon="md-add"></Button>
            </Col>
        </Row>
        <navs 
            @back="$router.push({name: 'DiagnosisUserGender'})"
            :hasBack="true"
            @next="goToSymptoms"
            :hasNext="true"
        />
    </div>
</template>
<script>
import navs from "../../../components/navigations/diagnosis";
export default {
    components:{navs},
    data() {
        return {
            age: 45,
            person: ''
        }
    },
    created(){
        let gender = this.$store.getters['diagnosis/getCurrent'].sex
        this.person =  gender == 'male' ? 'his' : 'her' 
    },
    methods:{
        goToSymptoms(){
            this.$store.commit('diagnosis/setAge', this.age)
            this.$router.push({name: 'DiagnosisSymptoms'})
        }
    }
}
</script>
<style scoped>

    span, h1{
        margin-bottom: 7.2px;
    }

    p{
        font-size: 72px
    }

    span{
        font-size: 32px;
    }

</style>

