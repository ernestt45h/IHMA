<template>
    <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1" :class="{animate: isLoading}"></div>
        <div class="sk-cube sk-cube2" :class="{animate: isLoading}"></div>
        <div class="sk-cube sk-cube3" :class="{animate: isLoading}"></div>
        <div class="sk-cube sk-cube4" :class="{animate: isLoading}"></div>
        <div class="sk-cube sk-cube5" :class="{animate: isLoading}"></div>
        <div class="sk-cube sk-cube6" :class="{animate: isLoading}"></div>
        <div class="sk-cube sk-cube7" :class="{animate: isLoading}"></div>
        <div class="sk-cube sk-cube8" :class="{animate: isLoading}"></div>
        <div class="sk-cube sk-cube9" :class="{animate: isLoading}"></div>
    </div>
    
</template>
<script>
    export default {
        name: 'diaga',
        props: ['isLoading'],
        created(){
            console.log(this.isLoading)
        }
    }
</script>
<style>
.sk-cube-grid {
  width: 100px;
  height: 100px;
  
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: rgb(0, 188, 212);
  float: right;
}

.sk-cube1{
    border-top-right-radius: 20%;
}

.sk-cube3{
    border-top-left-radius: 20%;
}



.sk-cube7{
    border-bottom-right-radius: 20%;
}

.sk-cube9{
    border-bottom-left-radius: 20%;
}


.sk-cube-grid .animate { 
-webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
}

.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s; }
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; }
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
          animation-delay: 0s; }
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s; }
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s; }

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1); 
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
  } 35% {
    -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
  } 
}

@media screen and (max-width: 425px) {
    .sk-cube-grid{
        width: 40px;
        height: 40px;
    }
}
    </style>

