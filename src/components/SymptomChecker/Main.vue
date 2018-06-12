<template>
    <div class="container bg-light">
        <guest-mode :isGuest="userType == 'guest'" @guestmodeoff="reset"></guest-mode>
        <div class="row">
            <div id="description" class="row col-md-8 text-center">
                <div class="col-sm-3 col-md-3">
                    <diaga :isLoading="isLoading" class="pull-right" id="diaga" ></diaga>
                </div>
                <div v-if="!isLoading" class="text col-sm-9 col-md-9">
                    <question-bank :questions="question" v-if="question"></question-bank>
                    <div v-else>
                        <h3 class="question">Hi I'm Lua, How may I help</h3>
                        <input @keypress.enter="Diagnose" v-model="parser" placeholder="eg. I feel dizzy" class="answer" type="search" autofocus>
                        <button @click="Diagnose" class="btn btn-info btn-raised">go</button>
                    </div>
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
        <choice-popup :active="popup.default" @genderAgeSetted="setStatus" @canceled="popup.default = false"></choice-popup>
    </div>
</template>
<script>
import Diaga from "./diaga";
import axios from "axios"
import host from "../../../config/host"
const ChoicePopup = ()=>import('./ChoisePopup')
const GuestMode = ()=>import('./GuestMode')
const QuestionBank = ()=>import('./QuestionBank')


export default {

  name: 'lua',
  components: {Diaga, ChoicePopup, GuestMode, QuestionBank},
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
          parser: ''
      }
  },



  methods:{

        reset(bool){
            console.log('resetting ', this.userType)            
            this.gender = ''
            this.age = ''
            this.question = ''
            this.conditions = ''
            this.parser = ''
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
        },

        Diagnose(){
            if(this.gender && this.age)
            axios.post(host.ihma + '/diagnosis', {
                text: this.parser,
                sex: this.gender,
                age: this.age
            }).then(doc=>{
                if(!doc.data.error){
                    doc = doc.data
                }else this.$vs.notify({
                    text: doc.data.error,
                    color: 'warning',
                })

                console.log(doc)
            }).catch(err=>{
                this.$vs.notify({
                    text: 'Please check your internet connection and try again',
                    color: 'danger',
                    title: 'Connection Error',
                    time: 4000
                })
            })
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
