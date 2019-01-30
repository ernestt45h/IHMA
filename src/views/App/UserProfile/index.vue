<template>
    <Row id="user-profile" type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="14" :md="15">
            <Row type="flex" justify="center">
                <div>
                    <img src="../../../assets/svg/profile_pic_placeholder.svg">
                </div>
                <Col class="input" :xs="20">
                    <Input placeholder="Name" type="text" v-model="detail.name" />
                </Col>
                <Col class="input" :xs="20">
                    <DatePicker type="date" placeholder="Date Of Birth" style="width: 100%"></DatePicker>
                </Col>
                <Col class="input" :xs="20">
                    <Select style="width:100%">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="both">Transgender</Option>
                    </Select>
                </Col>
            </Row>
        </Col>
        <Col :xs="20" :sm="12" :md="10">
        <template v-if="isEditable">
            <Row :gutter="16">
                <Col :xs="12">
                    <Button long >Cancel</Button>
                </Col>
                <Col :xs="12">
                    <Button @click="isEditable = !isEditable" long type="info" >Save</Button>
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
        
    </Row>
</template>
<script>
export default {
    data(){
        return {
            gender: 'both',
            isEditable: true,
            detail: this.$store.getters['user/getDetails'],
        }
    },
    methods:{
        swap(property){
            this.detail[property] = this.edited[property]
            this.editable[property] = false
            console.log('swiping');
            
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
        height: calc(100vh - 66px);
    }

    span{
        font-size: 18px;
        color: #3ea5df;
    }

    img{
        width: 150px;
    }

    .cards{
        margin-top: 20px;
    }
</style>
