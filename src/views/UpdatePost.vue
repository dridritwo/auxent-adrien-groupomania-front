<script setup lang="ts">
import { useRouter } from "vue-router";
import ArrowLeft from '../assets/ArrowLeft.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import UpdatePostForm from '../components/posts/UpdatePostForm.vue';

const router = useRouter();


function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="profil-container">
    <HeaderComponent />
    <ArrowLeft class="top-left-under" @click="goBack" />
    <UpdatePostForm />
  </div>
</template>

<style lang="scss" scoped>
.profil-container {
  background-color: $primary;
  width: 100vw;
  max-width: 100%;
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
</style>
