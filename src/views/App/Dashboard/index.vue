<template>
    <keep-alive>
        <div>
            <div class="container">
                <div class="grid-info row">
                    <router-link v-for="(nav, index) in tabs" :key="index" :to="{name: nav.route.name}" class="col-sm-6 col-md-4 col-lg-4">
                        <div class="top-comment-grid">
                            <div class="comments aqua">
                                <div class="comments-icon">
                                    <i :class="nav.icon"></i>
                                </div>
                                <div class="comments-info sub-info">
                                    <h3><i :class="nav.icon"></i></h3>
                                    <a href="#" class="text-capitalize">{{nav.name}}</a>
                                </div>
                                <div class="clearfix"> </div>
                            </div>
                        </div>
                    </router-link>
                    <div class="clearfix"> </div>
                </div>
                <div class="developer-tools">
                    <!-- <vs-button v-for="(btn, index) in tabs" :key="index" v-if="isDevelop(btn.actions)" style="border-radius: 50%" vs-color="warning" vs-type="flat" vs-icon="bug_report"></vs-button> -->
                </div>
            </div>
        </div>
    </keep-alive>
</template>
<script>
// random color pallet "this.colorPallet[Math.floor(Math.random()*colorPallet.length)]"
    export default{
        name: 'home',
        props: ['user'],
        data(){
            return{
                colorPallet:['aqua', 'blue', 'green', 'orange'],
                ranNum: 10,
                tabs: [
                    {name: 'Diagnosis', route: {name: 'DiagnosisIntro'}, icon: 'fa fa-stethoscope'}
                ]
            }        
        },
        methods: {
            
        },
        created(){
            // console.log(this.tabs.length)
            // if(this.tabs.length == 1){
            //     this.$router.push({name: 'Diagnosis'})
            // }
        }
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
        color: white !important;
    }

    .blue{
        background: linear-gradient(90deg, #6091fa, #4175e4) !important;
    }

    .aqua{
        background: linear-gradient(90deg, #3ddde0, #3da1e0) !important;
    }
    .green{
        background: linear-gradient(90deg, #88d338, #2dbd40) !important;
    }

    .orange{
        background: linear-gradient(90deg, rgba(207, 99, 37, 0.719), rgb(207, 100, 37)) !important;
    }

    .sub-info a{
        color: white !important;
    }

    .developer-tools{
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .top-comment-grid{
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, .25)
    }
</style>