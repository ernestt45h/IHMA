<template>
    <keep-alive>
        <div v-if="tabs">
            <div class="grid-info row">
                <router-link v-for="tab of tabs" :key="tab.name"  :to="'/'+tab.sub_name" v-if="isView(tab.actions)" class="col-sm-6 col-md-4 col-lg-3">
                    <div class="top-comment-grid">
                        <div class="comments" :class="colorPallet[Math.floor(Math.random()*colorPallet.length)]">
                            <div class="comments-icon">
                                <i :class="tab.fa_icon"></i>
                            </div>
                            <div class="comments-info sub-info">
                                <h3><i :class="tab.fa_icon"></i></h3>
                                <a href="#" class="text-capitalize">{{ tab.sub_name || capitalize }}</a>
                            </div>
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                </router-link>
                <div class="clearfix"> </div>
            </div>
        </div>
    </keep-alive>
</template>
<script>
    export default{
        name: 'home',
        props: ['user'],
        data(){
            return{
                colorPallet:['aqua', 'blue', 'green', 'orange'],
                ranNum: 10,
                tabs: this.$store.getters.permissions
            }        
        },
        methods: {
            isView:(perms)=>{
                for (var i = 0; i < perms.length; i++){
                    if (perms[i] === "read"){
                        return true
                    }
                }
            }
        },
    }
</script>
<style>
    .comments-icon i.fa
    {
        font-size: 5em;
        color: white;
        opacity: .5;
    }
    .comments-info a, .likes-info a{
        color: white;
    }

    .blue{
        background: #4175e4;
    }

    .aqua{
        background:#55acee;
    }
    .green{
        background: #90e436;
    }

    .orange{
        background: rgb(255, 104, 16);
    }

    .sub-info a{
        color: white !important;
    }
</style>