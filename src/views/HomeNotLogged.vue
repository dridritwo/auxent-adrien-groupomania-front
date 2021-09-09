<script setup>
import { ref } from 'vue'
import Icon from "@/assets/icon-above-font1.svg";
import ButtonBig from '@/components/buttons/ButtonBig.vue';
import IconAboveFont1 from '@/assets/IconAboveFont1.vue';


function logIn() {
  console.log("login")
}
</script>

<template>
  <div id="home-not-logged">
    <IconAboveFont1 />
    <ButtonBig class="spaced" @click="logIn()" text="Log in" />
    <ButtonBig class="spaced" text="Sign up" />
  </div>
</template>

<style lang="scss" scoped>
#home-not-logged {
  background-color: $primary;
  width: 100%;
  height: 100%;
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}
.spaced {
  
}
</style>
