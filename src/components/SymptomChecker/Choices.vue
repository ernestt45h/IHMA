<template>
    <div>
        <h3 class="question">{{question.text}}</h3>
        <div class="clearfix"></div>               
        <template v-if="question.type">
            <div class="col-12" v-if="question.type === 'single'">
                <single :item="question.items[0].choices" @clicked="pushSingle"></single>
            </div>
            <div v-else-if="question.type == 'group_single'">
                <group-single :item="question.items" @clicked="pushSingleGroup"></group-single>  
            </div>
            <!--Will fix you later-->
            <div v-else-if="question.type == 'group_multiple'">
                <group-multiple :item="question.items" @clicked="pushGroupMultiple"></group-multiple>
            </div>
        </template>
    </div>  
</template>
<script>
import Single from './QuestionBankbtn/Single'
import GroupSingle from './QuestionBankbtn/GroupSingle'
import GroupMultiple from './QuestionBankbtn/GroupMultiple'

export default {
    name: 'choices',
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
              //set evidence into an array object if not set
            if(!this.evidence && payload){
                this.evidence = []
            }
            this.evidence.push(payload)
        },

        go(){
           this.$emit('go', this.evidence) 
        },

        pushGroupMultiple(payload){
            this.evidence = ''
            for(let item of payload){
                console.log(item)
                this.addEvidence({
                    id: item.id,
                    choice_id: item.choice_id
                })
            }

            this.go()
            
        },

        pushSingle(payload){
            this.addEvidence({
                id: this.question.items[0].id,
                choice_id: payload
            })
            this.go()
        },

        pushSingleGroup(payload){
            this.addEvidence(payload)
            this.go()
        }
    }
}
</script>

