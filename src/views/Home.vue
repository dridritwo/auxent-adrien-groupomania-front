<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from "vue-router";

import ButtonLogOut from '@/components/buttons/ButtonLogOut.vue';
import ButtonDeleteUser from '@/components/buttons/ButtonDeleteUser.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
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
    <HeaderComponent />
  <div id="home">
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
  
}
</style>
