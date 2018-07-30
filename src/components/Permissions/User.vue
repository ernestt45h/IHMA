<template>
    <div class="container table-responsive">
        <table v-if="users" class="table table-dark">
            <thead>
                <tr>
                <th scope="col">Role</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <th>{{user.role}}</th>
                    <th>{{user.username}}</th>
                    <th>{{user.email}}</th>
                    <th>
                        <button @click="setUser(index)" class="btn btn-info"><i class="fa fa-edit"></i></button>
                    </th>
                </tr>
            </tbody>
        </table>    
        <vs-popup 
        vs-fullscreen
        v-if="user"
        vs-title="User Details"
        :vs-active="isUser" @vs-cancel="isUser=false">
            <vs-list-item vs-title="Username">
                <div v-if="!popupEdit.username" @click="popupEdit.username = true">
                    {{user.username}}
                </div>
                <div v-else>
                    <vs-input @keypress.enter="popupEdit.username = false" class="input" placeholder="Placeholder" v-model="user.username"/>
                </div>
            </vs-list-item>
            <vs-list-item vs-title="Email">
                <div v-if="!popupEdit.email" @click="popupEdit.email = true">
                    {{user.email}}
                </div>
                <div v-else>
                    <vs-input @keypress.enter="popupEdit.email = false" class="input" placeholder="Placeholder" v-model="user.email"/>
                </div>
            </vs-list-item>
            <vs-list-item vs-title="Role">
                <div v-if="!popupEdit.role" @click="popupEdit.role = true">
                    {{user.role}}
                </div>
                <div v-else>
                    <vs-input @keypress.enter="popupEdit.role = false" class="input" placeholder="Placeholder" v-model="user.role"/>
                </div>
            </vs-list-item>
            <vs-button @click="updateUser" vs-color="success" vs-type="flat" class="pull-right">Save</vs-button>
        </vs-popup>
    </div>
    
</template>
<script>
import Http from '../../models/Http'
import Axios from 'axios';


export default {
    name:'user-permission',
    data(){
        return{
            users: '',
            http: new Http(this.$store.getters.token),
            user: '',
            isUser: false,
            popupEdit: {
                username: false,
                email: false,
                role: false,
            }
        }
    },
    created(){
        this.http.req.get('/user').then(doc=>{
            this.users = doc.data
            console.log(this.users)
        })
    },
    methods:{
        setUser(user){
            this.user = this.users[user]
            this.isUser = true
        },
        updateUser(){
            this.http.req.put('/user', this.user).then(()=>{
                this.$vs.notify({
                    text: 'user updated',
                    color: 'success'
                })
                console.log('user updated')
            }).catch(err=>{
                this.$vs.notify({
                    text: 'user update failed',
                    color: 'danger'
                })
                console.log('user update failed')

            })
            this.isUser = false
        }
    }
}
</script>
<style scoped>
@import url('../../assets/css/basictable.css');
@import url('../../assets/css/table-style.css');
</style>

