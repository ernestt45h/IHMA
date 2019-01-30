<template>
    <Row id="splash" type="flex" justify="center" align="middle">
        <div>
            <img :class="{animate: loading}" src="../../assets/logo.png" height="150px"/>
            <fade-transition mode="out-in" group>
                <div v-if="!loading" key="welcome">
                    <h1>OneCare Plus</h1>
                    <h6>Making healthcare easier</h6>
                </div>
                <div v-else key="loading">
                    <h4>Loading...</h4>
                </div>
            </fade-transition>
        </div>
    </Row>
</template>
<script>
export default {
    name: 'loader',
    props: ['loading'],
    data() {
        return {
            isLoading: false
        }
    },
    watch: {
        loading(val){
            this.isLoading = this.loading
        }
    },
}
</script>
<style scoped>
    #splash{
        color: #3d9fe1;
        height: 100vh;
        text-align: center;
        /* transition: all .3s; */
    }

    img{
        position: absolute;
        transform: translate(-50%, -50%);
        top: calc(50vh - 100px);
    }

    .animate{
        animation-name: bounce;
        /* animation-direction:alternate; */
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in;
    }

    @keyframes bounce {
        0%{
            top: calc(50vh - 100px);
        }

        12.5%{
            top: calc(50vh - 100px);
            transform: scaleY(.72) translate(-50%, -50%)
        }

        25%{
            /* top: calc(50vh - 100px); */
            transform: scaleY(1) translate(-50%, -50%)
        }

        50%{
            top: calc(50vh - 150px);
        }

        60%{
            top: calc(50vh - 155px);
        }

        70%{
            top: calc(50vh - 155px);
        }

        100%{
            top: calc(50vh - 100px);
        }
    }
</style>

