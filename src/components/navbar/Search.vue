<template>
    <div class="w3l_search">
        <form action="/search" @submit.prevent="dosomething" method="get">
            <div class="input-group mb-4">
                <input v-model="search" type="text" class="form-control col-9" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <button class="btn btn-raised btn-success form-control col-3" type="submit">
                    <i class="fa fa-search"></i>
                </button>            
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name:'nav-search-bar',
    data(){
        return{
            search: ''
        }
    },
    methods:{
        dosomething(){
            console.log(this.search)
        }
    }
}
</script>
<style scoped>
    .btn{
        margin-top: 0px;
    }
</style>

