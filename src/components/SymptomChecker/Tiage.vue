<template>
 <div class="centerx">
    <vs-popup vs-fullscreen vs-title="Triage" :vs-active="popupActivo4" @vs-cancel="popupActivo4=false">
        <p>
            Currently under construction
        </p>
    </vs-popup>
  </div>
</template>

<script>
export default {
  data(){
    return {
      popupActivo4:true
    }
  }
}
</script>