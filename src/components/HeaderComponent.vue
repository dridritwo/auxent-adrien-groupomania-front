<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex";

const store = useStore();
const route = useRoute()
const router = useRouter()

function go(slug: string) {
  
  router.push(slug)
}

onMounted(() => {
})

</script>

<template>
<header>
  <img class="profile-image" @click="go(`/profil`)" :src="`${store.state.user.avatar_url}`" alt="avatar" >

</header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>
