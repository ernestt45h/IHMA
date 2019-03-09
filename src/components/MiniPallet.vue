<template>
    <span id="pallet">
        <span id="val">{{value}}</span>
        <Button size="small" shape="circle" icon="md-remove"></Button>
    </span>
</template>
<script>
export default {
    props:['value'],

}
</script>
<style scoped>
    #pallet{
        background: #333;
        padding: 10px 10px 13px;
        border-radius: 50px; 
        color: #fff;
    }
</style>

