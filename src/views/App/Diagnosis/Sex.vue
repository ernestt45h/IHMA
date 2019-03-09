<template>
    <div>
        <h1>Please Select gender</h1>
        <Row :gutter="6">
            <Col :xs="12">
                <Button @click="setGender('female')" class="icon">
                    <Icon  type="ios-woman-outline"></Icon>
                    <p>Female</p>
                </Button>
            </Col>
            <Col :xs="12">
                <Button @click="setGender('male')" class="icon">
                    <Icon type="ios-man-outline"></Icon>
                    <p>Male</p>
                </Button>
            </Col>
            <Button @click="setGender('both')" size="large" long>Don't know?</Button>
        </Row>
        <navs 
            @back="$router.push({name: 'DiagnosisProfileSelection'})" :hasBack="true" 
            next="Select gender above" />
    </div>        
</template>
<script>
import navs from "../../../components/navigations/diagnosis";
export default {
    components: {navs},
    data() {
        return {
            person: this.$store.getters['diagnosis/getCurrent']
        }
    },
    
    methods:{
        setGender(gender){
            this.$store.commit('diagnosis/setGender', gender)
            this.$router.push({name: 'DiagnosisUserAge'})
        }
    }
}
</script>

<style scoped>
    .icon, p{
        font-size: 72px;
        /* color: #3da1e0; */
        min-width: 100% ;
    }

    h1, .icon, p{
        text-align: center;
        margin-bottom: 7.2px;
    }

    p{
        font-size: 24px;        
    }
</style>
