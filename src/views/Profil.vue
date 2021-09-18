<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from "vue-router";

import ButtonLogOut from '@/components/buttons/ButtonLogOut.vue';
import ButtonDeleteUser from '@/components/buttons/ButtonDeleteUser.vue';
const route = useRoute();
const router = useRouter();

const store = useStore()
const user = computed(() => store.state.user)
const formatedUser = computed(() => store.getters.formattedUser)
const userToken = computed(() => store.getters.userToken)

onMounted(() => {

})
</script>

<template>
  <div id="home">
    
      <div>name {{ user.username }}</div>
      <ButtonLogOut />
      <ButtonDeleteUser />
      <img :src="`${user.avatar_url}`" alt="avatar" >
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
