<template>
        <div id="navs">
            <Row>
                <Button size="large" @click="backClicked" :disabled="!hasBack" :type="hasBack? 'default' : 'dashed'" icon="ios-arrow-back">{{ back || 'Back'}}</Button>
                <Button size="large" @click="nextClicked" :disabled="!hasNext" :type="hasNext? 'info' : 'dashed'">{{ next || 'Next' }} <Icon type="ios-arrow-forward"/></Button>
            </Row>
        </div>
</template>
<script>
export default {
    watch:{
        hasNext(val){
            this.hasNext = val
        }
    },
    props:['next', 'back', 'hasNext', 'hasBack'],
    methods:{
        nextClicked(){
            this.$emit('next')
        },

        backClicked(){
            this.$emit('back')
        }
    }
}
</script>
<style scoped>
    #navs{
        position: fixed;
        bottom: 10px;
        right: 10px;
    }
</style>

