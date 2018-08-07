<template>
    <div class="permission container">
        <div class="card">
            <div class="card-title d-inline text-center text-primary">
                <h1>User Permissions</h1>
            </div>
            <div class="card-body">
                <form class="form-group row" @keypress.enter.prevent>
                    <input v-model="search" class="form-control col-md-10 offset-md-1" type="text" id="search-permission">
                    <button @click="addPermission" type="button" class="btn btn-success col-md-1 offset-md-10"><i class="fa fa-plus"></i></button>
                </form>
                <div class="permissions-list">
                    <ul class="list-group">
                        <button v-for="(perm, index) in filteredPerms" 
                                :key="index" type="button"
                                class="list-group-item list-group-item-action align-items-start"
                                @click="EditPermission(index)">
                            <div class="d-flex justify-content-between">
                                <h5 class="mb-1 text-info"><i :class="perm.fa_icon"></i> {{perm.name}}</h5>
                                <small>Role: {{perm.role}}</small>
                            </div>
                            <p class="mb-1">Access Point: {{perm.access_point}}</p>
                            <small v-for="(action, index) in perm.actions" :key="index">{{action}} </small>
                        </button>
                    </ul>
                </div>
            </div>
        </div>
         <vs-popup 
        v-if="EditablePerm"
        :vs-title="'Edit Permission ' + EditablePerm._id"
        :vs-active="isEdit" @vs-cancel="isEdit=false">
        <form class="container" action="" @keypress.enter.prevent>
            <div class="form-group row">
                <label for="EditName" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="EditName" v-model="EditablePerm.name">
                </div>
            </div>
            <div class="form-group row">
                <label for="EditSubName" class="col-sm-2 col-form-label">Sub Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="EditSubName" v-model="EditablePerm.sub_name">
                </div>
            </div>
            <div class="form-group row">
                <label for="EditRole" class="col-sm-2 col-form-label">Role</label>
                <div class="col-sm-10">
                    <select class="form-control" id="EditAccessPoint" :value="EditablePerm.role">
                        <option>developer</option>
                        <option>patient</option>
                        <option>doctor</option>
                        <option>nurse</option>
                        <option>admin</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="EditAccessPoint" class="col-sm-2 col-form-label">Access Point</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="EditAccessPoint" v-model="EditablePerm.access_point">
                </div>
            </div>
            <div class="form-group row">
                <label for="EditAccessPoint" class="col-sm-2 col-form-label">Actions</label>
                <div class="col-sm-10">
                    <ul class="nav nav-pills nav-fill">
                        <li class="nav-item" v-for="(action, index) in filtedActions" :key="index">
                            <a @click="addAction(action.name, action.type)" class="nav-link" :class="{active: action.type}" href="#">{{action.name | captilize}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group pull-right">
                <button @click="update(EditablePerm._id)" type="button" v-if="EditablePerm._id" class="btn btn-success"><i class="fa fa-edit"></i> Update</button>
                <button @click="save" type="button" v-else class="btn btn-success"><i class="fa fa-plus"></i> Save</button>
            </div>
            <div class="clearfix"></div>
        </form>
         </vs-popup>
    </div>
</template>
<script>

import Http from '../../models/Http'

export default {
    data(){
        return{
            http: new Http(this.$store.getters.token),
            permissions: [],
            search: '',
            EditablePerm: [],
            isEdit: false
        }
    },
    computed:{
        filteredPerms(){
            return this.permissions.filter(perm=>{
                if(perm.sub_name.match(this.search)) return perm
            })
        },
        filtedActions(){



            var results = [
                {name: 'create', type: false},
                {name: 'read', type : false},
                {name: 'update', type: false},
                {name: 'delete', type: false},
                {name: 'develop', type: false}
            ]

            console.log('running computed filterpersm')
            if(this.EditablePerm.actions){
            for(var action of this.EditablePerm.actions){
                for(var resultIndex in results){   
                    results[resultIndex].type = results[resultIndex].name == action ? true : results[resultIndex].type
                }
            }}

            return results
        }
    },
    methods:{
        EditPermission(permIndex){
            this.EditablePerm = this.permissions[permIndex]
            this.isEdit = true
        },
        addPermission(){
            this.EditablePerm = {}
            this.isEdit = true
        },
        update(id){
            this.isEdit = false
            this.$vs.loading()
            this.http.req.put('/permissions/'+id, this.EditablePerm)
            .then(_=>{
                this.$vs.loading.close()
                this.$vs.notify({
                    text: 'Permission Updated',
                    color: 'success'
                })
            }).catch(err=>{
                this.$vs.loading.close()
                this.$vs.notify({
                    text: err,
                    color: 'danger'
                })
                this.isEdit = true
            })
        },
        save(){
            this.$vs.loading()
            this.http.req.post('/permissions', this.EditablePerm)
            .then(_=>{
                this.$vs.loading.close()
                this.$vs.notify({
                    text: 'Permission Updated',
                    color: 'success'
                })
            }).catch(err=>{
                this.$vs.loading.close()
                this.$vs.notify({
                    text: error,
                    color: 'danger'
                })
            })
        },
        addAction(name,type){


            //check if there is editable perms actions are empty
            //if yes make it an array
            this.EditablePerm.actions = !this.EditablePerm.actions ? new Array : this.EditablePerm.actions
            
            let checker = false
            
            for(let row in this.EditablePerm.actions){
                //check if array contains the name field in the index area
                if( name == this.EditablePerm.actions[row]){
                    checker = true
                    this.EditablePerm.actions.splice(row,1)
                }
            }

            if(!checker) this.EditablePerm.actions.push(name)
            console.log(this.EditablePerm)
        
        }
    },
    created(){
        this.$vs.loading()
        this.http.req.get('/permissions').then(doc=>{
            this.$vs.loading.close()
            console.log(doc.data)
            return doc.data
        }).then(doc=> this.permissions = doc)
    }
}
</script>

