<template>
    <div>
        <button class="btn btn-secondary col-12" v-for="(choice, index) in item" :key="index"> {{choice.name}}</button>
        <button class="btn btn-primary"><i class="fa fa-arrow"></i></button>
    </div>
</template>
<script>

export default {
    name: 'group-multiple',
    props:['item']
}

</script>

