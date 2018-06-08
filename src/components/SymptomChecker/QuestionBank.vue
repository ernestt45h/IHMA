<template>
    <div>
        <h3 class="question">{{question.text | captilize}}</h3>        
        <div v-if="question.type">
            <div v-if="question.type === 'single'">
                <single :item="question.items" @clicked="addEvidence"></single>
            </div>
            <div v-else-if="question.type == 'group_single'">
                <group-single :item="question.items" @clicked="addEvidence"></group-single>  
            </div>
            <!--Will fix you later-->
            <div v-else-if="question.type == 'group_multiple'">
                <group-multiple :item="question.items" @clicked="addEvidence"></group-multiple>
            </div>
        </div>
    </div>  
</template>
<script>
import Single from './QuestionBankbtn/Single'
import GroupSingle from './QuestionBankbtn/GroupSingle'
import GroupMultiple from './QuestionBankbtn/GroupMultiple'

export default {
    name: 'question-bank',
    props: ['question'],
    components:{Single, GroupSingle, GroupMultiple},
    data(){
        return {
            evidence: '',
            parser: ''
        }
    },
    methods:{
        addEvidence(payload){
            this.evidence.push(payload)
        },

        doSomething(){

        },
    }
}
</script>

