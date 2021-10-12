<script setup lang="ts">
import ButtonBig from '@/components/buttons/ButtonBig.vue';
import IconAboveFont1 from '@/assets/IconAboveFont1.vue';
import { useStore } from 'vuex'
import {onMounted} from 'vue'
import { useRouter, useRoute } from "vue-router";
const store = useStore()
const router = useRouter();

onMounted(()=>{
  
})
</script>

<template>
  <div id="home-not-logged">
    <div class="home-container">
      <IconAboveFont1 />
    <ButtonBig text="Log in" routeUrl="/login" />
    <ButtonBig text="Sign up" routeUrl="/signup" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#home-not-logged {
  background-color: $primary;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .home-container {
    max-width: $max-width-desk;
  }
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}

</style>
