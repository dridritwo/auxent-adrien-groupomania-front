<script setup lang="ts">
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from "vue-router";

import ButtonLogOut from '../components/buttons/ButtonLogOut.vue';
import ButtonDeleteUser from '../components/buttons/ButtonDeleteUser.vue';
import ArrowLeft from '../assets/ArrowLeft.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import ProfilInfoComponent from '../components/ProfilInfoComponent.vue';
import ButtonMedium from '../components/buttons/ButtonMedium.vue';
import AllPostsByAuthorId from '../components/posts/AllPostsByAuthorId.vue';
const route = useRoute();
const router = useRouter();

const store = useStore()


onMounted(() => {
})

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="profil-container">
    <HeaderComponent />
    <ArrowLeft class="top-left-under" @click="goBack" />
    <ProfilInfoComponent />
    <div class="button-container">
      <ButtonMedium text="edit" routeUrl="profil-edit" />
    <ButtonLogOut />
    <ButtonDeleteUser />
    </div>
    <AllPostsByAuthorId />
  </div>
</template>

<style lang="scss" scoped>
.profil-container {
  background-color: $primary;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}
.top-left-under {
  position: absolute;
  top: 65px;
  left: 5px;
}
.button-container {
  max-width: 500px;
}
</style>
