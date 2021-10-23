<script setup lang="ts">

const props = defineProps({
  username: String,
  author_id: Number,
  post_id: Number,
  avatarUrl: String,
  id: Number,
  text: String,
});
</script>

<template>
<div class="comment">
  {{username}}
  {{author_id}}
  {{post_id}}
  {{avatarUrl}}
  {{id}}
  {{text}}
</div>
</template>

<style lang="scss" scoped>
</style>
