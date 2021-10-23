<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import IconHome from "../assets/IconHome.vue";
import IconFire from "../assets/IconFire.vue";
import IconAdd from "../assets/IconAdd.vue";
import ProfilSmallComponent from "./ProfilSmallComponent.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

function go(slug: string) {
  router.push(slug);
}

const props = defineProps({
  username: String,
  email: String,
  avatar_url: String
})

onMounted(() => {});
</script>

<template>
  <header>
    <ProfilSmallComponent  />
    <IconHome class="hover-grow" @click="go(`/home`)" />
    <IconFire class="hover-grow" />
    <IconAdd class="hover-grow" @click="go(`/new-post`)" />
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
