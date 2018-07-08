<template>
    <div class="template">
        <img id="left" src="../../assets/svg/SVG/left.svg" alt="">
        <img id="right" src="../../assets/svg/SVG/right.svg" alt="">
        
        <vs-row id="login"
        vs-align="center"
        vs-type="flex" 
        vs-justify="space-around"
        vs-w="12">
            <vs-col vs-justify="center" vs-align="center" vs-lg="4" vs-xs="12" vs-sm="6">
                <slot></slot>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
export default {
    name: 'form-template'
}
</script>


<style scoped>
    .template{
        background: url('../../assets/svg/SVG/bg.svg') no-repeat;
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right:0;
    }



    @keyframes animatebg {
        0%{
            margin-top: 0px;
        }


        25%{
            top: 0%;
        }

        50%{
            margin-top: 0%
        }

        75%{
            top: 60%;
        }

        100%{
            margin-top: 0px;
        }
    }

    #left{
        width: 100px;
        position: absolute;
        top: 50%;
        bottom: 50%;
        animation-name: animatebg;
        animation-delay: 1s;
        animation-duration: 5s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;

    }
    
    #right{
        width: 100px;
        right: 0;
        position: absolute;
        top: 10%;
        z-index: 0;
        animation-name: animatebg;
        animation-delay: 1s;
        animation-duration: 8s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;

    }

    #login{
        position: absolute;
        top: 0;
        bottom: 0;
    }
</style>

