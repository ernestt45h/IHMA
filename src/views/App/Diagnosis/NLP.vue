<template>
    <div>
        <Row type="flex" justify="center">
            <Col :xs="20">
                <h1>Add {{person}} symptoms</h1>
                <p>Please use the search or click on the mic to voice your symptoms.</p>
            </Col>
            <Col :xs=22>
                <Input size="large" @on-enter="parse" v-model="search" placeholder="eg: Headache dizzy">
                    <Button v-if="!search" type="text" shape="circle" @click="recordVoice"  slot="suffix" icon="md-mic"></Button>
                    <Button v-else type="text" shape="circle" :loading="loading" @click="parse" slot="suffix" icon="md-search"></Button>
                </Input>
            </Col>
            <Col v-if="error" id="alert" :xs=20>
                <Alert :type="error.type" show-icon>
                    {{error.title}}
                    <Icon :type="error.icon" slot="icon"></Icon>
                    <template slot="desc">
                        {{error.desc}}
                        <template  v-if="error.callback">
                            <Divider></Divider>
                            <Button type="info" ghost @click="error.callback">Try again</Button>
                        </template>
                    </template>
                </Alert>
            </Col>
            <Col class="card" :xs="24">
                <!-- <Card> -->
                    <template>
                        <!-- {{symptoms}} -->
                        <scale-transition group mode="out-in">
                            <Col 
                            v-for="(symptom, index) in symptoms"
                            :key="index">
                                <Button
                                :type="symptom.choice_id == 'present' ? 'info' : 'error'" 
                                shape="circle"
                                long
                                id="btn"
                                >
                                    <Row type="flex" justify="space-between">
                                        <div>
                                            <Icon :type="symptom.choice_id == 'present' ? 'md-add' : 'md-remove'"></Icon>
                                            {{symptom.name}} 
                                        </div>
                                        <Icon @click="symptoms.splice(index, 1)" type="md-close"></Icon>
                                    </Row>
                                </Button>
                            </Col>
                        </scale-transition>
                        <template v-if="symptoms.length > 0">
                            <Divider></Divider>
                            <span ><Icon type="md-information-circle"></Icon> please make sure these are your symptoms</span>
                        </template>
                        <span v-else><Icon type="md-information-circle"></Icon> please  try to add more than one symptom</span>
                    </template>
                <!-- </Card> -->
            </Col>
        </Row>
        <navs 
        @next="next"
        :hasNext="symptoms.length > 0" 
        :hasBack="true"
        @back="$router.go(-1)"/>
    </div>
</template>
<script>
import navs from "../../../components/navigations/diagnosis";
import { log } from 'util';
export default {
    components:{navs},
    data() {
        return {
            loading: false,
            error: '',
            search: '',
            person: '',
            symptoms: this.$store.getters['diagnosis/getCurrent'].initials
        }
    },
    computed:{
        reversedSymptom(){
            return this.symptoms.reverse()
        }
    },
    
    methods: {
        next(){
            let symptoms = this.symptoms.map(symptom=>{
                return {...symptom, initial: true}
            })
            // this.$store.commit('diagnosis/addInitialSymptoms', symptoms)
            
            this.$router.push({name: 'DiagnosisRiskFactors'})
        },
        recordVoice(){
            
        },
        parse(){
            this.error = ''
            this.loading = true
            this.$store.dispatch('diagnosis/parse', this.search)
            .then((result) => {
                this.loading = false
                console.log(result);
                
                if(result.mentions.length < 1) {
                    this.error = {
                        type: 'info',
                        title: 'Unfortunately, I could not understand your symptoms.',
                        icon: 'md-sad',
                        desc: 'Please try individual symptoms eg. headache dizzy'
                    }
                }
                else 
                {
                    console.log(result)
                    result.mentions.forEach(symptom => {
                        let isExist = false
                        for(let el of this.symptoms){
                            console.log(el)
                            if(el.id == symptom.id ){
                                if( el.choice_id == symptom.choice_id ) isExist = true
                                else symptom.choice_id = el.choice_id
                            }
                        }
                        if(!isExist) this.symptoms.push(symptom)
                        this.search = ''
                    });
                }
            }).catch((err) => {
                console.error(err);
                
                this.loading = false
                this.error = {
                    type: 'error',
                    title: 'No internet connection',
                    icon: 'ios-wifi',
                    desc: 'Unfortunately, search isn’t available offline. Please check your connection and try again.',
                    callback: this.parse
                }
            });
        }
    },
    created(){
        
        this.$store.commit('diagnosis/setStartTime')
        let current = this.$store.getters['diagnosis/getCurrent']
        this.person =  current.mode == 'self' ? 'your' : current.sex == 'male' ? 'his' : 'her' 

    },
}
</script>
<style scoped>

    div *{
        text-align: center;
    }

    p{
        margin-bottom: 7.2px;
        text-align: center;
    }

    .card{
        padding: 7.4px;
        margin-top: 7.2px;
    }

    #btn{
        margin-bottom: 5px;
    }
</style>

