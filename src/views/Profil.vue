<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from "vue-router";

import ButtonLogOut from '@/components/buttons/ButtonLogOut.vue';
import ButtonDeleteUser from '@/components/buttons/ButtonDeleteUser.vue';
import ArrowLeft from '../assets/ArrowLeft.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
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

  <HeaderComponent/>
  <div v-if="store.state.user" id="profil">
    <ArrowLeft class="top-left-under" @click="goBack" />
    <img class="profil-image" :src="`${store.state.user.avatar_url}`" alt="avatar" >
    <div class="infos">
      
      <div>name : {{ store.state.user.username }}</div>
      <div>email : {{ store.state.user.email }}</div>
      <div>avatar_url : {{ store.state.user.avatar_url }}</div>
    </div>
      <ButtonLogOut />
      <ButtonDeleteUser />
      </div>
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
#profil {
  background-color: $primary;
  width: 100vw;
  max-width: $max-width-desk;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  color: white;
}

.profil-image {
  width: 70%;
  background-color: black;
  border-radius: 50%;
}

.infos {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  text-align: left;
}
.top-left-under {
  position: absolute;
  top: 60px;
  left: 0;
}

</style>
