<template>
    <div v-if="suggetions.length > 1">
        <h1>Do you have any of the following symptoms?</h1>
        <Divider></Divider>
        <Row v-if="loading" type="flex" justify="center">
            <Spin size="large"></Spin>
        </Row>
        <template v-else>
            <Row v-for="(suggested, index) in suggetions" :key="index" style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Col :xs="22">
                    <h6>{{suggested.name}}</h6>
                    <span 
                        v-if="suggested.name != suggested.common_name"
                        >{{suggested.common_name}}</span>
                </Col>
                <Col :xs="2">
                    <Checkbox
                        v-model="suggested.choice_id"
                        >
                    </Checkbox> 
                </Col>
            </Row>
            <navs
                @back="$router.go(-1)"
                :hasNext="true"
                :hasBack="true"
                @next="startDiagnosis"
            />
        </template>
    </div>
</template>
<script>
import navs from "../../../components/navigations/diagnosis";
export default {
    components:{navs},
    data() {
        return {
            loading: false,
            suggetions: []
        }
    },
    methods: {
        startDiagnosis(){
            let suggested = this.suggetions.filter(suggetion=>suggetion.choice_id == true)
            suggested = suggested.map(suggetion=>({
                ...suggetion,
                choice_id: 'present'
            }))
            console.log('suggested', suggested);
            
            this.$store.commit('diagnosis/addSuggestions', suggested)

            this.$router.push({name: 'DiagnosisDiagnose'})
        },

        getSuggestions(){
            let current_diagnosis = this.$store.getters['diagnosis/getCurrent']
            let symptoms = this.$store.getters['diagnosis/getSymptoms']
            console.log('current_diagnosis', symptoms);
            
            let selected = symptoms.filter(filtered=>{
                return filtered.choice_id == 'present'
            })
            .map(element=>element.id)


            let suggetions = {
                sex : current_diagnosis.sex,
                age: current_diagnosis.age,
                selected
            }

            console.log(suggetions);
            
            this.$emit('loading', this.isLoading = true)
            this.$store.dispatch('diagnosis/suggest', suggetions)
                .then(evidences=>{
                    console.log(evidences);
                    this.$emit('loading', this.isLoading = false)            
                    this.suggetions = evidences
                })
                .catch(err=>{
                    console.log(err.response);
                    
                    // this.$Modal.confirm({
                    //     title: 'Error',
                    //     content: err.response,
                    //     okText: 'OK',
                    //     cancelText: 'Cancel'
                    // });
                    this.$emit('loading', this.isLoading = false)
                    
                })
        }
    },
    created(){
        this.getSuggestions()
    }
}
</script>

<style scoped>
    h1{
        text-align: center;
    }
</style>
