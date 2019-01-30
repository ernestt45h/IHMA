<template>
    <auth-layout>
        <Col :xs="24">
            <Input class="input" placeholder="Email" type="email" v-model="email"/>
            <Input class="input" placeholder="Password" type="password" v-model="password"/>
            <Button @click="login" :loading="loading" class="button btn" long type="info"> Sign In</Button>
            <span class="pull-right">Don't have an account? <router-link to="#">Sign Up</router-link></span>
            <!-- <Divider dashed/> -->
            <!-- <h5>OR</h5> -->
            <!-- <Button class="button" long type="error" icon="logo-google"> Google</Button>             -->
        </Col>
    </auth-layout>
</template>
<script>
import AuthLayout from './Layout'
export default {
    components:{
        AuthLayout
    },
    data() {
        return {
            email: 'ernest@gmail.com',
            password: 'Jimjam241',
            loading: false
        }
    },
    methods:{
        login(){
            this.loading = true
            this.$store.dispatch('user/login', {
                email: this.email,
                password: this.password
            }).then(()=>{
                this.loading = false
            })
        }
    }
}
</script>
<style scoped>
    .input{
        margin-bottom: 15px;
    }

    .button{
        margin: 15px 0;
    }
</style>
