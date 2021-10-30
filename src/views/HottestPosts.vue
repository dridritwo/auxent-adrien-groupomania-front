<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import AllHottestPosts from "../components/posts/AllHotPosts.vue";

</script>

<template>
  <HeaderComponent />
  <div class="home-container">
    <AllHottestPosts />
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  background-color: $primary;
}
</style>
