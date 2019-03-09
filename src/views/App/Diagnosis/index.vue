<template>
    <div>
        <!-- <Row type="flex" justify="center">
            <Col :xs="20">
                <Row type="flex" justify="space-between">
                    <Col :xs="18"><h6>stage</h6></Col>
                    <Col class="prog" :xs="6"><Progress :percent="10" hide-info :stroke-width="7.2"/></Col>
                </Row>
            </Col>
        </Row>
        <Divider></Divider> -->
        <Row id="diagnosis" type="flex" justify="center">
            <Row type="flex" justify="center">
                <Col :xs="22">
                    <Row >
                        <!-- <i class="fa fa-stethoscope" style="font-size: 100px"></i> -->
                        <!-- <img src="../../../assets/logo.png" height="100px"/> -->
                    </Row>
                    <loader :isLoading="loading" v-if="!hidden" style="text-align:center"/>                    
                    <Row class="content" type="flex" justify="center" >
                        <keep-alive>
                            <fade-transition mode="out-in">
                                <router-view @hide="setHidden" @loading="isLoading"/>
                            </fade-transition>
                        </keep-alive>
                    </Row>
                </Col>
            </Row>
        </Row>
    </div>
</template>
<script>
import loader from '../../../components/misc/splash_loader'
export default {
    components:{loader},
    data() {
        return {
            loading: false,
            hidden: false,
        }
    },
    methods: {
        isLoading(loading){
            this.loading = loading
        },
        setHidden(hidden){
            this.hidden = hidden
        }
    },
}
</script>

<style scoped>
    #diagnosis{
        /* background: #333; */
        height: calc(100vh - 130px);
    }

    .prog{
        margin-top: 5px;
    }

    .content{
        margin-top: 10px;
        text-align: center;
    }
</style>
