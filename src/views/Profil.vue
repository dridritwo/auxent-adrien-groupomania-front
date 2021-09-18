<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from "vue-router";

import ButtonLogOut from '@/components/buttons/ButtonLogOut.vue';
import ButtonDeleteUser from '@/components/buttons/ButtonDeleteUser.vue';
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
  <div v-if="store.state.user" id="home">
    <button @click="goBack">Back</button>
    <img class="profile-image" :src="`${store.state.user.avatar_url}`" alt="avatar" >
    
      <div>name : {{ store.state.user.username }}</div>
      <div>email : {{ store.state.user.email }}</div>
      <div>avatar_url : {{ store.state.user.avatar_url }}</div>
      <ButtonLogOut />
      <ButtonDeleteUser />
  </div>
</template>

<style lang="scss" scoped>
#home {
  background-color: $primary;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  .home-container {
    max-width: $max-width-desk;
  }
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}
</style>
