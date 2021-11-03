<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import AllPosts from "../components/posts/AllPosts.vue";

</script>

<template>
  <HeaderComponent />
  <main class="home-container">
    <AllPosts />
  </main>
</template>

<style lang="scss" scoped>
.home-container {
  background-color: $primary;
}
</style>
