<template>
    <div>
        <div v-if="triage">
            <Col :xs="24">
                <Card :style="`background: var(--${color})`">
                    <Row type="flex" justify="center">
                        <i 
                            class="fa text-white"  
                            style="font-size:72px"
                            :class="{
                                'fa-ambulance': triage.triage_level == 'emergency',
                                'fa-stethoscope': triage.triage_level == 'consultation',
                                'fa-info': triage.triage_level == 'self_care',
                                
                                }"
                            ></i>
                    </Row>
                </Card>
            </Col>
            <Col class="content" :xs="24">
                <template v-if="triage.triage_level == 'emergency'">
                    <h1>Immediate medical attention recommended</h1>
                    <p>Immediate contact with a medical professional or emergency services is advised.</p>
                    <p v-if="triage.condition.extras">{{triage.condition.extras.hint}}</p>
                    <p v-if="triage.serious">Alarming symptoms:</p>
                </template>
                <template v-else-if="triage.triage_level == 'consultation'">
                    <h1>Prompt medical attention recommended</h1>
                    <p>Consulting a medical professional soon is advised.</p>
                    <p v-if="triage.condition.extras">{{triage.condition.extras.hint}}</p>
                    <p v-if="triage.serious">Symptoms requiring further examination:</p>
                </template>
                <template v-else>
                    <h1>Medical attention recommended</h1>
                    <p>Contacting a medical professional is advised.</p>
                    <p v-if="triage.condition.extras">{{triage.condition.extras.hint}}</p>  
                </template> 
                <Row type="flex" justify="center">
                    <Col :xs="24" v-for="(symptom, index) in triage.serious" :key="index">
                        <Tag type="dot" :color="symptom.is_emergency ? 'error' : 'primary'">{{symptom.name}}</Tag>
                    </Col>
                </Row>
            </Col>
        </div>
        <Divider></Divider>
    </div>
</template>
<script>
export default {
    props:['triage'],
    computed:{
        color(){
            switch(this.triage.triage_level){
                case 'emergency' : return 'danger'
                    break;
                case 'consultation' : return 'warning'
                    break;
                default : return 'primary'
            }
        }
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
        margin-bottom: 7.2px;
    }

    .content{
        padding:10px
    }
</style>
