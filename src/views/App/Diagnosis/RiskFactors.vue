<template>
    <div>
        <Row type="flex" justify="center">
            <Col :xs="24">
                <h1>Risk Factors.</h1>
                <p>Please check all the statements below that apply to you</p>
            </Col>
            <Col v-for="(risk, index) in risks" :key="index" class="ans-btn" :xs="24" :md="14">
                <Card style="text-align: left">
                    {{risk.name}}
                    <Divider>
                    <RadioGroup v-model="risk.choice_id">
                        <Radio label="present">Yes</Radio>
                        <Radio label="absent">No</Radio>
                        <Radio label="unknown">Don't know</Radio>
                    </RadioGroup>
                    </Divider>
                </Card>
            </Col>
        </Row>
        <navs 
            :hasNext="hasNext"
            :hasBack="true"
            @back="$router.go(-1)"
            @next="suggestSymptoms"
            />
    </div>
</template>
<script>
import navs from '../../../components/navigations/diagnosis'
import risk_factors from '../../../assets/json/selected_risk_factors.json'
export default {
    components:{navs},
    computed:{
        hasNext(){
            let hasnext = true
            this.risks.forEach(risk => {
                console.log(risk.choice_id);
                if(typeof risk.choice_id == 'undefined') {
                    hasnext = false
                }
            })

            return hasnext
        }
    },
    data() {
        return {
            risks: risk_factors.map((risk=>({
                id: risk.id, name: risk.name, common_name: risk.common_name, 
            }))),
            phone: ''
        }
    },
    methods:{
        suggestSymptoms(){
            this.$store.commit('diagnosis/addRiskFactors', this.risks)
            this.$router.push({name: 'DiagnosisSuggest'})
        }
    }
}
</script>
<style scoped>
    h1, p{
        text-align: center;
        margin-bottom: 7.2px;
    }

    .ans-btn{
        text-align: right;
        margin-bottom: 15px;
    }

</style>

