<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from "vue-router";

import ButtonLogOut from '@/components/buttons/ButtonLogOut.vue';
import ButtonDeleteUser from '@/components/buttons/ButtonDeleteUser.vue';
import ArrowLeft from '../assets/ArrowLeft.vue';
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
  <div v-if="store.state.user" id="profil">
    <ArrowLeft class="top-left" @click="goBack" />
    <img class="profile-image" :src="`${store.state.user.avatar_url}`" alt="avatar" >
    
      <div>name : {{ store.state.user.username }}</div>
      <div>email : {{ store.state.user.email }}</div>
      <div>avatar_url : {{ store.state.user.avatar_url }}</div>
      <ButtonLogOut />
      <ButtonDeleteUser />
  </div>
</template>

<style lang="scss" scoped>
#profil {
  background-color: $primary;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  
}


</style>
