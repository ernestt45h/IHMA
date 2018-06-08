<template>
    <vs-row 
    id="signup"
    vs-align="center"
    vs-type="flex" vs-justify="space-around" vs-w="12">
    <vs-col vs-justify="center" vs-align="center" vs-lg="4" vs-xs="12" vs-sm="6">
            <vs-card id="signup-card"  class="holamundo" >
                 <vs-alert v-if="error" vs-icon="warning" vs-active="true" vs-color="danger">
                        {{error}}
                    </vs-alert>
                <vs-card-header vs-title="SignUp" vs-background-color="primary" >
                    <vs-avatar vs-size="large" vs-text="One Care"/>
                </vs-card-header>
                <vs-card-body>
                    <form action="signup" method="post" @keypress.enter.prevent="signup">
                        <template lang="html">
                            <div class="">
                                <vs-tabs>
                                <vs-tab vs-label="Email">
                                    <div class="con-tab-ejemplo">
                                        <vs-input 
                                            vs-icon="person" 
                                            vs-label-placeholder="Username" 
                                            v-model="username"
                                            vs-type="custom"
                                            :vs-valid.sync="validos.username"
                                            :vs-validation-function="(value) => value.length > 5"
                                            vs-danger-text="Email must be a valid email"
                                            />
                                        <vs-input 
                                            vs-icon="email" 
                                            vs-label-placeholder="Email" 
                                            v-model="email"
                                            vs-type="email"
                                            :vs-valid.sync="validos.email"
                                            vs-success-text="Email is valid"
                                            vs-danger-text="Email must be a valid email"/>
                                        <vs-input
                                            vs-icon="lock"
                                            :vs-valid.sync="validos.password"
                                            vs-success-text="Field is valid"
                                            vs-danger-text="Field must have at least 5 characters"
                                            :vs-validation-function="(value) => value.length > 5"
                                            vs-type="password" vs-label-placeholder="Password" v-model="password"/>
                                            <vs-input
                                            vs-icon="loop"
                                            :vs-valid.sync="validos.repassword"
                                            vs-success-text="Password matchs"
                                            vs-danger-text="Passwords mismatch"
                                            :vs-validation-function="(value) => this.password === this.repassword"
                                            vs-type="password" vs-label-placeholder="Password" v-model="repassword"/>
                                    </div>
                                </vs-tab>
                                <vs-tab vs-label="Phone">
                                    <div class="con-tab-ejemplo">

                                    Service
                                    </div>
                                </vs-tab>
                                </vs-tabs>
                            </div>
                            </template>
                        
                    </form>
                </vs-card-body>
                <vs-card-actions>
                    <vs-button @click="signup" vs-type="primary-relief">SignUp</vs-button>
                </vs-card-actions>
                <div class="card-footer">
                    Already have an account? <router-link to="login">Click here</router-link>
                </div>
            </vs-card>
            
        </vs-col>
    </vs-row>
</template>
<script>
import host from '../../../config/host'
import axios from 'axios'
export default {
    name: 'login',
    data(){
        return {
            username: 'ernestt45h',
            email: 'ernest.hayford@bluecrest.edu.gh',
            password: 'Jimjam241',
            repassword: 'Jimjam241',
            success_popup: true, 
            error: '',
            validos: {
                password: false,
                repassword: false,
                email: false,
                username: false
            }
        }
    },
    mounted(){
    },
    methods:{
        signup(){
            var val = this.validos
            if(val.password && val.repassword && val.email && val.username){
                this.error = ''
                this.$vs.loading()
                axios.post(host.ihma+ '/signup', {
                    username: this.username,
                    password: this.password,
                    email: this.email
                }).then(doc=>{
                    if(doc.data){
                        var data = doc.data
                        if(data.error) this.error = data.error
                        else{
                            this.$vs.alert({
                                title:'Successfull Sign Up',
                                text: 'An email has been sent to '+this.email+',<br> check it to activate your account',
                                textConfirm:'Close',
                                color:'success',
                                confirm:()=>{
                                    this.$router.push('login')
                                },
                            })
                        }
                    }
                    this.$vs.loading.close()
                    
                }).catch((err)=>{
                    console.log(err)
                    this.$vs.notify({
                        title:'Connection Error',
                        text:'Check internet connection and try again',
                        color:'danger',
                        position: 'top-right'
                    })
                    this.$vs.loading.close()                
                })
            }else{
                this.error = 'please fill in all the fields with valid information'
            }
        }
    }
}
</script>
<style scoped>

    #signup{
        background: url('../../assets/wall.png');
        background-position: center;
        position: absolute;
        top: 0;
        bottom: 0;
        
    }

    #signup-card{
        background: #eee;
    }
    
</style>


