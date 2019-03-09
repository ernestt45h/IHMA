<template>
    <div v-if="!isLoading">
        <template v-if="result">
            <h1 style="text-align: center">{{result.question.text}}</h1>
            <Divider></Divider>
        </template>
        <Row v-if="!result" type="flex" justify="center">
            <Spin size="large"></Spin>
        </Row>
        <template v-else>
            <div class="fixbottom" v-if="result.question.type == 'single'">
                <div>
                    <Col class="ans-btn" :xs="24"><Button @click="processSingle(result.question.items[0].id, 'present')" shape="circle">Yes</Button></Col>
                    <Col class="ans-btn" :xs="24"><Button @click="processSingle(result.question.items[0].id, 'absent')" shape="circle">No</Button></Col>
                    <Col class="ans-btn" :xs="24"><Button @click="processSingle(result.question.items[0].id, 'unknown')" shape="circle">Don't Know</Button></Col>
                </div>
            </div>
            <div class="fixbottom" v-if="result.question.type == 'group_single'">
                <div>
                    <Col v-for="(ans, index) in result.question.items" :key="index" class="ans-btn" :xs="24">
                        <Button @click="processGroupSingle(ans.id)" shape="circle">{{ans.name}}</Button>
                    </Col>
                    <Col class="ans-btn" :xs="24"><Button @click="processUnkownGroupSingles" shape="circle">Don't Know</Button></Col>
                </div>
            </div>
            <div v-if="result.question.type == 'group_multiple'">
                <div>
                    <Col v-for="(ans, index) in result.question.items" :key="index" class="ans-btn" :xs="24" :md="24">
                        <Card style="text-align: left">
                            {{ans.name}}
                            <Divider>
                            <RadioGroup v-model="ans.ans">
                                <Radio v-for="(choice, index) in ans.choices" :key="index" :label="choice.id">{{choice.label}}</Radio>
                            </RadioGroup>
                            </Divider>
                        </Card>
                    </Col>
                    <div>
                        <Col class="ans-btn" :xs="24">
                            <Button @click="proccessGroupMultiple" :disabled="!isAllSelected" shape="circle">Next</Button>
                        </Col>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data() {
        return {
            result: '',
            isAdded: false,
            isLoading: false,
            count: 0
        }
    },
    computed:{
        isAllSelected(){
            let isAll = 0
            let choices = this.result.question.items
            choices.forEach(choice => {
                if(choice.ans) isAll++
            });

            return isAll == choices.length
        }
    },
    methods:{

        diagnose(){
            this.$emit('loading', this.isLoading = true)
            this.$store.dispatch('diagnosis/diagnose')
            .then((result) => {
                this.count++
                if((this.count > 7 || result.should_stop)){
                    this.$store.commit('diagnosis/setCurrentConditions', result.conditions)
                    this.$router.push({name: 'DiagnosisTriage'})
                }else
                    this.result = result
                    this.$emit('loading', this.isLoading = false)
            }).catch((err) => {
                this.$Modal.error({
                    title: 'Error',
                    content: err.response || 'There seems to be a network error',
                    okText: 'Retry',
                    onOk: this.diagnose
                });
                console.error(err);
                this.$emit('loading', this.isLoading = false)                
            });
        },

        process(symptoms){
            this.$store.commit('diagnosis/addCurrentSymptoms', symptoms)
            this.diagnose()
        },

        processSingle(id, choice_id){
            let symptom = [{id, choice_id}]
            this.process(symptom)            
        },

        processGroupSingle(id){
            let choice = [{ id, choice_id: 'present' }]
            this.process(choice)
        },

        processUnkownGroupSingles(){
            console.log('asdasd')
            let choices = []
            let items = this.result.question.items
            items.forEach(symptom=>{
                choices.push({id: symptom.id, choice_id: 'unknown'})
            })

            this.process(choices)
        },

        proccessGroupMultiple(){
            let filtered = this.result.question.items.map(choice=>({
                choice_id: choice.ans,
                id: choice.id
            }))
            
            this.process(filtered)
        }

    },
    created(){
        this.diagnose()
    }
}
</script>
<style scoped>
    .ans-btn{
        text-align: right;
        margin-bottom: 15px;
    }

    .fixbottom{
        position: fixed;
        right: 20px;
        bottom: 10px;
    }
</style>
