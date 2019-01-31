<template>
    <Row id="user-profile" type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="14" :md="15">
            <Row type="flex" justify="center">
                <Col>
                    <h1>Basic Information</h1>
                </Col>
                <Col class="input" :xs="20">
                    <Input placeholder="Name" type="text"  v-model="edited.name" />
                </Col>
                <Col class="input" :xs="20">
                    <DatePicker type="date" v-model="edited.age" placeholder="Date Of Birth" style="width: 100%"></DatePicker>
                </Col>
                <Col class="input" :xs="20">
                    <Select placeholder="Gender" style="width:100%" v-model="edited.gender">
                        <Option value="male">Male <Icon type="md-male"/></Option>
                        <Option value="female">Female <Icon type="md-female"/></Option>
                        <Option value="both">Transgender <Icon type="md-transgender"/></Option>
                    </Select>
                </Col>
            </Row>
        </Col>
        <Col :xs="20" :sm="12" :md="10">
        <template v-if="isEditable">
            <Row :gutter="16">
                <Col :xs="12">
                    <Button :disabled="!isEdited" @click="reset" long >Cancel</Button>
                </Col>
                <Col :xs="12">
                    <Button @click="updateUser" :disabled="!isEdited" :loading="saving" long type="info" >Save</Button>
                </Col>
            </Row>
        </template>

        <template v-else>
            <Row :gutter="16">
                <Col :xs="12"><Button long >Cancel</Button></Col>
                <Col :xs="12"><Button long type="info">Save</Button></Col>
            </Row>
        </template>
        </Col>        
        <!-- <pre style="text-align: left">
            Details
            {{details}}

            Edited
            {{edited}}
        </pre> -->
    </Row>
</template>
<script>
export default {
    name: 'basic-user-info',
    data(){
        return {
            gender: 'both',
            isEditable: true,
            saving: false,
            details: this.$store.getters['user/getDetails'],
            edited: ''
        }
    },
    computed:{
        isEdited(){
            if( this.details.name !== this.edited.name) return true
            else if(this.details.age !== this.edited.age) return true
            else if(this.details.gender !== this.edited.gender) return true
        }
    },
    methods:{
        updateUser(){
            this.saving =true
            this.$store.dispatch('user/updateDetails', this.edited)
            .then((result) => {
                this.saving = false
                this.$router.push({name: 'Dashboard'})
            }).catch((err) => {
                console.error(err)
                this.$Message.error('Failed to update user')
            });
        },

        reset(){
            this.edited = this.details
            this.$router.go(-1)
        }
    },
    created(){
        this.edited = {...this.details}
        if(this.details.age){
            this.edited.age = this.edited.age.toDate()
            this.details.age = this.details.age.toDate()
        }
    }
}
</script>
<style scoped>

    .input{
        margin-top: 20px;
    }

    #user-profile{
        /* background: url('../../../assets/svg/bg2.svg'); */
        background-size: cover;
        text-align: center;
        height: calc(100vh - 0px);
    }

    span{
        font-size: 18px;
        color: #3ea5df;
    }

    img{
        width: 200px;
    }

    .cards{
        margin-top: 20px;
    }
</style>
