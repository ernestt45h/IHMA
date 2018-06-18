<template>
    <div class="container bg-light">
        <guest-mode :isGuest="userType == 'guest'"></guest-mode>
        <div class="row">
            <div id="description" class="row col-md-8 text-center">
                <div class="col-sm-3 col-md-3">
                    <diaga :isLoading="isLoading" class="pull-right" id="diaga" ></diaga>
                </div>
                <div v-if="!isLoading" class="text col-sm-9 col-md-9">
                    <question-bank></question-bank>
                </div>
            </div>            
            <div class="card col-md-4">
                <h3 class="card-header center">Possible Diagnosis</h3>
                <ul v-if="conditions"  class="list-group card-body">
                    <li v-for="condition in conditions" :key="condition.id" class="list-group-item"><p>
                        {{condition.name}}</p><p class="text-muted pull-right" :class="{'alert-success': condition.probability > .9}"> {{ condition.probability * 100 }}%</p>
                    </li>
                    <button class="btn btn-raised btn-info" @click="restartDiag">Restart diagnosis</button>
                </ul>
                <div v-else>
                    <vs-alert vs-active="true">
                        <h1 class="text-center"><i class="fa fa-info-circle"></i></h1>
                        <h6>While our content is meticulously assembled and carefully curated by
                            a board of medical experts, our solution is intended for informational
                            and educational purposes only and should not be treated as a doctor's
                            advice, a medical consultation, or a diagnosis.
                        </h6>
                    </vs-alert>
                </div>
            </div>
        </div>
        <choice-popup :active="popup.default" @genderAgeSetted="setStatus"></choice-popup>
    </div>
</template>
<script>
import Diaga from "./diaga";
import axios from "axios"
const ChoicePopup = ()=>import('./ChoisePopup')
const GuestMode = ()=>import('./GuestMode')
const QuestionBank = ()=>import('./QuestionBank')


export default {

  name: 'lua',
  components: {Diaga, ChoicePopup, GuestMode, QuestionBank},
  watch:{
      "conditions": function(val){
          if(this.conditions[0].probability >= .9 ){
              /*
              this.$vs.loading()
              axios.post(host.name + '/triage',{
                sex: this.gender,
                age: this.user.age || this.age,
                evidence: this.evidence,
            }).then((res)=>{
                this.$vs.loading.close()
                console.log(res.data)
                if (res.status == 200){
                    this.$vs.confirm({
                    title:'Possible Diagnosis',
                    text:'There seem\'s to be high probability you might be suffering from '+this.conditions[0].name +
                         '. Would you like to accept the results or cancel to continue the diagnosis?',
                    color:'danger',
                    confirm:()=>{
                        this.$vs.notify({
                            title:'Eliminado',
                            text:'Lorem ipsum dolor sit amet',
                            color:'danger',
                        })
                    }
                })
                }
            }).catch(()=>{
                this.$vs.loading.close()
            })
            */
          }
      }
  },
  data(){
      return {
          userType: '',
          gender: 'male',
          age: '',
          popup: {
                default: false,
                someone: false,
                myself: false,
                gender: [
                    {text: 'Male', value: 'male'},
                    {text: 'Female', value: 'female'},
                    {text: 'W\'ont say', value: 'both'},
                ]
          },

          user: this.$store.getters.user,
          isLoading: false,
          conditions: '',
          propableDiag: '',
          evidence: '',
          triggerModal: false,
          question: {
              text: 'am Lua, how may I help?',
              type: ''
          },
          answers: '',
          parser: 'I feel dizzy',
          gender: 'male',
      }
  },


  mounted(){
      //this.popup.default = true
  },
  methods:{
        setStatus(doc){
            this.age = doc.age,
            this.gender = doc.gender,
            this.userType = doc.type
            this.popup.default = false
        },

        restartDiag(){
            this.evidence = '',
            this.question =  {
                text: 'am Lua, how may I help?',
                type: ''
            }
            this.parser = '',
            this.conditions = ''
        },

        doSomething: function(){
            bus.$emit('error','')
            this.parseDiag()
        },


        parserEvidence(){
            /*
            axios.post(host.name + '/diagnose',{
                sex: this.gender,
                age: this.user.age || this.age,
                evidence: this.evidence,
            }).then((res)=>{
                this.isLoading = false  
                if(res.status== 200){
                    res = res.data
                    console.log(res)
                    if(res.question){
                        this.question = res.question
                        this.conditions = res.conditions
                        if(res.evidences){
                            this.evidence = res.evidences
                        }
                    }else{
                        console.log('sorry')
                    }
                }else{
                    console.log('error')
                }
            }).catch((e)=>{
                this.isLoading = false  
                bus.$emit('error', {
                    color: 'red',
                    msg: 'Connection Error'
                })
                console.log(e)
            })
            */
        },

        parseDiag(){
            /*
            this.isLoading = true            
            axios.post(host.name + '/diagnose',{
                sex: this.gender,
                age: this.user.age || this.age,
                text: this.parser,
            }).then((res)=>{
                this.isLoading = false  
                if(res.status== 200){
                    res = res.data
                    console.log(res)
                    if(res.question){
                        this.question = res.question
                        this.conditions = res.conditions
                        if(res.evidences){
                            this.evidence = res.evidences
                        }
                    }else{
                        console.log('sorry')
                    }
                }else{
                    console.log('error')
                }
            }).catch((e)=>{
                this.isLoading = false  
                bus.$emit('error', {
                    color: 'red',
                    msg: 'Connection Error'
                })
                console.log(e)
            })
            */
        },
        addEvidence(evidence){
            //set evidence into an array object if not set
            if(!this.evidence && evidence){
                this.evidence = []
            }
            this.evidence.push({
                choice_id : evidence.choice_id,
                id: evidence.id
            })
            
        },
        newEvedence(evidence){
            for(var i = 0; i < this.evidence.length; i++){
                if(this.evidence[i].id == evidence.id){
                    this.evidence.splice(i,1)
                    console.log(this.evidence)
                }
            }
            this.addEvidence(evidence)         
            this.parserEvidence()
        }
            

  }
}
</script>

<style>

    #description{
        margin: 5em auto;
    }

    .icon{
        font-size: 100px;
        border-radius: 100%;
    }
    
    .text{
        margin-top: 10px;
    }

    .text input{
        width: 250px;
        height: 30px;
        padding: 10px;
        border: none;
        border-bottom: 2px solid #777;
    }

    #diaga{
        margin-right: 10px;
    }

    #gender-select{
        margin-top: 3px;
    }
</style>
