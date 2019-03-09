<template>
    <div>
        <fade-transition mode="out-in">
            <router-view/>
        </fade-transition>
    </div>
</template>
<script>
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

const { StatusBar } = Plugins;

export class StatusBarExample {
    isStatusBarLight = true

    changeStatusBar() {
        StatusBar.setStyle({
        style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light
        });
        this.isStatusBarLight = !this.isStatusBarLight;
    }

    hideStatusBar() {
        StatusBar.hide();
    }

    showStatusBar() {
        StatusBar.show();
    }
}
export default {
    
}
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');

    body{
        font-family: 'Montserrat', sans-serif;
    }
</style>
