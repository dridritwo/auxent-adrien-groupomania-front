<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import ButtonLogOut from "@/components/buttons/ButtonLogOut.vue";
import ButtonDeleteUser from "@/components/buttons/ButtonDeleteUser.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import AllPosts from "../components/posts/AllPosts.vue";
const route = useRoute();
const router = useRouter();

const store = useStore();
const user = computed(() => store.state.user);
const formatedUser = computed(() => store.getters.formattedUser);
const userToken = computed(() => store.getters.userToken);

onMounted(() => {});
</script>

<template>
  <HeaderComponent />
  <div class="home-container">
    <AllPosts />
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  background-color: $primary;
}
</style>
