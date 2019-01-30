<template>
    <div class="splash">
        <div class="holder">
            <img id="heart" @click="isLoading = !isLoading" :class="{animate: isLoading}" src="../../assets/logo.png">
        </div>
    </div>
</template>
<script>
export default {
    props: ['isLoading']
}
</script>
<style scoped>
    .splash{
        transition: all .3s;
    }

    img{
        margin-top: 0px;
        height: 150px;
    }

    @media screen and (max-width: 425px) {
        img{
            margin-top: 0px;
            height: 72px;
        }
    }

    .animate{
        animation: logo .5s ease-in  infinite alternate;
    }

    @keyframes logo {
        0%{
            margin-top:  0px;

        }

        70%{
            transform: scaleY(1)
        }

        100%{
            margin-top: 36px;
            transform: scaleY(.8);
        }
    }

</style>
