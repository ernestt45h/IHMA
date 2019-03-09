<template>
    <div>
        <h1>Summary</h1>
        <Row class="list-row" type="flex" justify="space-between">
            <h5>Your answers</h5>
            <Button type="text">Show</Button>
        </Row>
        <Row class="list-row" type="flex" justify="space-between">
            <h5>PDF report</h5>
            <Button type="text">Download</Button>
        </Row>
        <Row class="list-row" type="flex" justify="space-between">
            <h5>History</h5>
            <Button type="text">Save</Button>
        </Row>
        
        <Divider></Divider>
        <Row type="flex" justify="space-around">
            <Button :to="{name: 'Dashboard'}" type="info">Back Home</Button>
            <Button type="info">Start Over</Button>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            time: (new Date()).getTime()
        }
    },
    created(){

    }    
}
</script>
<style scoped>
    h1{
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 7.2px;
    }

    p{
        font-size: 15px;
        margin-bottom: 7.2px;
    }

    .content{
        padding:10px
    }

    .list-row{
        margin: 7.2px;
    }
</style>