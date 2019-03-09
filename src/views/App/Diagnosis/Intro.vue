<template>
    <Row type="flex" justify="center">
        <Col :xs="20" :sm="14" :md="10" class="container">
            <h1>
                Hi, I'm Aihma!
            </h1>
            <p>
                You’re about to have a short and safe health checkup. 
                Your answers will be carefully analyzed and you’ll learn about possible causes of your symptoms.
            </p>
            <navs @next="nextPage" :hasNext="true"/>
        </Col>
    </Row>
</template>
<script>
import navs from '../../../components/navigations/diagnosis'
export default {
    components:{
        navs
    },
    methods:{
        nextPage(){
            this.$router.push({name: 'DiagnosisProfileSelection'})
        }
    },
    created(){
    }

}
</script>

<style scoped>
    div{
        text-align: center;
    }

    h1{
        margin-bottom: 7.2px;
    }

    p{
        font-size: 14px
    }
</style>
