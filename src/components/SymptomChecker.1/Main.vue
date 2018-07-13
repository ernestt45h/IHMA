<template>
    <div class="container bg-light">
        <guest-mode :isGuest="userType == 'guest'" @guestmodeoff="reset"></guest-mode>
        <div class="row">
            <div id="description" class="row col-md-7 col-lg-8 text-center">
                <div class="col-sm-3 col-md-3">
                    <diaga :isLoading="isLoading" class="pull-right" id="diaga" ></diaga>
                </div>
                <div v-if="!isLoading" class="text col-sm-9 col-md-9">
                    <choices :question="question" v-if="question" @go="parseAndGo"></choices>
                    <div class="parser" v-else>
                        <h3 class="question">Hi I'm Aihma, How may I help</h3>
                        <input @keypress.enter="Diagnose" v-model="parser" placeholder="eg. I feel dizzy" class="answer" type="search" autofocus>
                        <button @click="Diagnose" class="btn btn-primary btn-raised">go</button>
                    </div>
                </div>
            </div>
            <div class="col-md-5 col-lg-4">          
                <vs-card>
                    <vs-card-header vs-background-color="#00bcd4" vs-title="Possible Diagnosis" >
                        <i class="fa fa-stethoscope"></i>
                    </vs-card-header>
                    <vs-card-body>
                    <ul v-if="conditions"  class="list-group ">
                        <li v-for="condition in conditions" :key="condition.id" class="list-group-item">
                            <div class="row">
                                <p class="col-9">{{condition.name}}</p>
                                <p class="text-muted col-3" :class="{'alert-success': condition.probability > .9}"> {{ (condition.probability * 100).toFixed(2)  }}%</p>
                            </div>
                        </li>
                        <button class="btn btn-raised btn-info" @click="restartDiag">Restart diagnosis</button>
                    </ul>
                    <div v-else>
                        <vs-alert vs-active="true">
                            <h1 class="text-center"><i class="fa fa-info-circle"></i></h1>
                            <h5>While our content is meticulously assembled and carefully curated by
                                a board of medical experts, our solution is intended for informational
                                and educational purposes only and should not be treated as a doctor's
                                advice, a medical consultation, or a diagnosis.
                            </h5>
                        </vs-alert>
                    </div>
                    </vs-card-body>
                </vs-card>
            </div>
        </div>
        {{evidences}}
        <choice-popup :active="popup.default" @genderAgeSetted="setStatus" @canceled="popup.default = false"></choice-popup>
    </div>
</template>
<script>
import Diaga from "./diaga";
import axios from "axios"
import host from "../../../config/host"
const ChoicePopup = ()=>import('./ChoisePopup')
const GuestMode = ()=>import('./GuestMode')
const Choices = ()=>import('./Choices')


export default {

  name: 'Aihma',
  components: {Diaga, ChoicePopup, GuestMode, Choices},
  data(){
      return {
          isLoading: false,
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

          conditions: '',
          question: '',
          evidences: '',
          parser: ''
      }
  },



  methods:{

        reset(bool){
            console.log('resetting ', this.userType)   
            this.restartDiag()         
            this.age = ''
            this.conditions = ''
            this.userType = ''
            
        },

        popupSelector(bool){
            this.popup.default = true
        },

       setStatus(doc){
            this.age = doc.age,
            this.gender = doc.gender,
            this.userType = doc.type
            this.popup.default = false
            this.Diagnose()
        },

        parseAndGo(payload){
            console.log(payload)
            if(!this.evidences && payload){
                this.evidences = []
            }

            for (let evidence of payload){
                   //set evidence into an array object if not set
                for(var i = 0; i < this.evidences.length; i++){
                    if(this.evidences[i].id === evidence.id){
                        this.evidences.splice(i)
                    }
                }
                this.evidences.push(evidence)            
            }

            if(this.gender && this.age){
                this.isLoading = true
                axios.post(host.ihma + '/diagnosis', {
                    evidence: this.evidences,
                    sex: this.gender,
                    age: this.age
                }).then(doc=>{
                    this.isLoading = false
                    if(!doc.data.error){
                        doc = doc.data
                        console.log("result", doc)
                        if(doc.question){
                            this.conditions = doc.conditions
                            this.question = doc.question
                        }else{
                            this.reset()
                            //TODO fix later
                            //this.question = "Can't seem to find what's wrong with you at the moment? please try again"
                            console.log(this.question)
                            this.$vs.notify({
                                text: 'Can\'t seem to find what\'s wrong with you at the moment',
                                color: 'warning',
                            })
                        }
                    }else this.$vs.notify({
                        text: doc.data.error,
                        color: 'warning',
                    })
                }).catch(err=>{
                    this.isLoading = false
                    this.$vs.notify({
                        text: 'Please check your internet connection and try again',
                        color: 'danger',
                        title: 'Connection Error',
                        time: 4000
                    })
                })
            }
            else this.popupSelector()
            
        },

        restartDiag(){
            this.evidences = ''
            this.question =  ''
            this.parser = ''
            this.conditions = ''
        },


        Diagnose(){
            if(this.gender && this.age){
                this.isLoading = true
                axios.post(host.ihma + '/diagnosis', {
                    text: this.parser,
                    evidence: this.evidences,
                    sex: this.gender,
                    age: this.age
                }).then(doc=>{
                    this.isLoading = false
                    if(!doc.data.error){
                        doc = doc.data
                        console.log("result", doc)
                        if(doc){
                            this.conditions = doc.conditions
                            this.question = doc.question
                            this.evidences = doc.evidences
                        }
                    }else this.$vs.notify({
                        text: doc.data.error,
                        color: 'warning',
                    })
                }).catch(err=>{
                    this.isLoading = false
                    this.$vs.notify({
                        text: 'Please check your internet connection and try again',
                        color: 'danger',
                        title: 'Connection Error',
                        time: 4000
                    })
                })
            }
            else this.popupSelector()
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
