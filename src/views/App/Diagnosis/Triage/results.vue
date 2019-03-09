<template>
    <div>
        <div v-if="isModal">
            <Modal v-model="isModal" fullscreen>
                <div v-if="!isLoading">
                    <p style="color:#f60;text-align:center;font-size:16px">
                        <Icon type="ios-information-circle"></Icon>
                        <span>{{picked.condition.name}} 
                            <template v-if="picked.condition.name != picked.condition.common_name">also known as {{picked.condition.common_name}}</template>
                        </span>
                    </p>
                    <Divider></Divider>
                    <Row v-if="picked.condition.extras">
                        <b>Hint on what to do:</b>
                        <p>{{picked.condition.extras.hint}}</p>
                    </Row>
                    <Row>
                        <Divider>Reasons why</Divider>
                        <Button
                            v-for="(evidence, index) in picked.supporting_evidence" :key="index"
                            type="text" 
                            shape="circle"
                            long
                            id="btn"
                            >
                                <Row type="flex" justify="space-between">
                                    <div>
                                        <Icon class="text-green" type="md-arrow-up"></Icon>
                                        {{evidence.common_name}} 
                                    </div>
                                </Row>
                            </Button>
                    </Row>
                    <Row>
                        <Divider>Reasons why not</Divider>
                        <Button
                            v-for="(evidence, index) in picked.conflicting_evidence" :key="index"
                            type="text" 
                            shape="circle"
                            long
                            id="btn"
                            >
                                <Row type="flex" justify="space-between">
                                    <div>
                                        <Icon class="text-red" type="md-arrow-down"></Icon>
                                        {{evidence.common_name}} 
                                    </div>
                                </Row>
                            </Button>
                    </Row>
                    <Row>
                        <Divider>Unkonwn Reasons</Divider>
                        <Button
                            v-for="(evidence, index) in picked.unconfirmed_evidence" :key="index"
                            type="text" 
                            shape="circle"
                            long
                            id="btn"
                            >
                                <Row type="flex" justify="space-between">
                                    <div>
                                        <Icon type="md-help"></Icon>
                                        {{evidence.common_name}} 
                                    </div>
                                </Row>
                            </Button>
                    </Row>
                    <!-- {{picked}} -->

                </div>
                <Spin v-else/>
                <div slot="footer">
                    <Button type="info" size="large" long  @click="isModal = false">Close</Button>
                </div>
            </Modal>
        </div>
        <div>
            <Col class="content" :xs="24">
                <h1>Results</h1>
                <p>
                    Please note that the list below may not be complete and is
                    provided solely for informational purposes and is not a qualified medical 
                    opinion.
                </p>
                <p>Click any row to see details.</p>
                <Divider></Divider>
                <Button v-for="(condition, index) in conditions" :key="index" @click="showDetails(condition)"  long type="text">
                    <Col class="text-left" :xs="22">
                        <h6>{{condition.name}}</h6>
                        <p v-if="condition.probability >= .8">Strong evidence</p>
                        <p v-else-if="condition.probability > .4 && condition.probability < .8">Moderate evidence</p>
                        <p v-else>Weak evidence</p>
                    </Col>
                    <Col :xs="24" style="height: 30px">
                        <Progress hide-info 
                        :percent="condition.probability * 100" 
                        :status="condition.probability >= .8 ? 'wrong': 'active'" />
                    </Col>
                </Button>
            </Col>
        </div>
        <Divider></Divider>
    </div>
</template>
<script>
export default {
    props:['conditions'],
    data() {
        return {
            isModal:false,
            picked: {},
            isLoading: false

        }
    },
    methods:{
        showDetails(condition){
            //Todo Get condition and explain
            this.isLoading = true
            this.isModal = true
            this.picked.name = condition.name
            this.$store.dispatch('diagnosis/explain', condition.id)
            .then((result) => {
                this.isLoading = false
                this.picked = result
            }).catch((err) => {
                this.isLoading = false
                console.log(err)
            });
        // this.picked = {
        //     "conflicting_evidence": [
        //         {
        //         "id": "s_261",
        //         "name": "Tachycardia",
        //         "common_name": "Fast heartbeat"
        //         },
        //         {
        //         "id": "s_1333",
        //         "name": "Dyspnea, exacerbating during exercise",
        //         "common_name": "Shortness of breath that gets worse during exercise"
        //         },
        //     ],
        //     "supporting_evidence": [
        //         {
        //         "id": "s_98",
        //         "name": "Fever",
        //         "common_name": "Fever"
        //         },
        //         {
        //         "id": "s_81",
        //         "name": "Chills",
        //         "common_name": "Chills"
        //         },
        //         {
        //         "id": "s_102",
        //         "name": "Cough",
        //         "common_name": "Cough"
        //         },
        //         {
        //         "id": "s_119",
        //         "name": "Lethargy",
        //         "common_name": "Feeling weak and tired"
        //         },
        //         {
        //         "id": "s_88",
        //         "name": "Dyspnea",
        //         "common_name": "Shortness of breath"
        //         },
        //         {
        //         "id": "s_284",
        //         "name": "Diminished appetite",
        //         "common_name": "Diminished appetite"
        //         },
        //         {
        //         "id": "s_1858",
        //         "name": "Cough, lasting three to eight weeks",
        //         "common_name": "Cough, lasting three to eight weeks"
        //         },
        //         {
        //         "id": "p_164",
        //         "name": "Diagnosed chronic obstructive pulmonary disease",
        //         "common_name": "Diagnosed chronic obstructive pulmonary disease"
        //         },
        //         {
        //         "id": "s_1625",
        //         "name": "Dyspnea, chronic",
        //         "common_name": "Chronic shortness of breath"
        //         },
        //         {
        //         "id": "s_1317",
        //         "name": "Dyspnea, paroxysmal nocturnal",
        //         "common_name": "Shortness of breath and cough waking up at night"
        //         },
        //         {
        //         "id": "s_563",
        //         "name": "Dyspnea, orthopnea",
        //         "common_name": "Shortness of breath when lying flat"
        //         },
                
        //     ],
            
        //     "unconfirmed_evidence": [
        //         {
        //         "id": "s_99",
        //         "name": "Fever between 98,6 and 100,4°F (37 and 38°C)",
        //         "common_name": "Fever between 98,6 and 100,4°F (37 and 38°C)"
        //         },
        //         {
        //         "id": "s_100",
        //         "name": "Fever greater than 100,4°F (38°C)",
        //         "common_name": "Fever greater than 100,4°F (38°C)"
        //         },
        //         {
        //         "id": "s_103",
        //         "name": "Cough, lasting less than three weeks",
        //         "common_name": "Cough lasting less than three weeks"
        //         },
        //         {
        //         "id": "s_106",
        //         "name": "Cough, lasting more than eight weeks",
        //         "common_name": "Cough lasting more than eight weeks"
        //         },
        //         {
        //         "id": "s_104",
        //         "name": "Cough, productive",
        //         "common_name": "Coughing up phlegm"
        //         },
        //         {
        //         "id": "s_92",
        //         "name": "Dyspnea, acute",
        //         "common_name": "Shortness of breath appearing suddenly or developing over several minutes"
        //         },
        //         {
        //         "id": "s_90",
        //         "name": "Dyspnea, subacute",
        //         "common_name": "Shortness of breath getting worse over a few hours or days"
        //         }
        //     ],
        //     "condition": {
        //         "id": "c_973",
        //         "name": "Chronic obstructive pulmonary disease exacerbation",
        //         "common_name": "COPD Flare-up",
        //         "sex_filter": "both",
        //         "categories": [
        //         "Pulmonology"
        //         ],
        //         "prevalence": "very_rare",
        //         "acuteness": "chronic_with_exacerbations",
        //         "severity": "moderate",
        //         "extras": {
        //         "hint": "You may require an immediate medical attention!",
        //         "icd10_code": "J44.1"
        //         },
        //         "triage_level": "consultation"
        //     },
        //     "name": "Chronic obstructive pulmonary disease exacerbation"
        // }
        // this.isModal = true
        }
    },
}
</script>
<style scoped>
    .text-green{
        color: var(--green)
    }
</style>
