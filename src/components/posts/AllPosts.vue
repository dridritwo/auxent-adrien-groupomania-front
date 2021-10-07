<script setup >
import { onMounted } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import { getAllPosts } from "../../services/PostService";


const store = useStore();
const posts = ref([]);

onMounted(async () => {
  let allPosts = await getAllPosts();
  allPosts.forEach(post => {
    posts.value.push(post)
  });
});
</script>

<template>
<div v-for="(post, index) in posts" :key="index" class="post-list">
  <div  class="post-header">
    <img :src="post.authorAvatarUrl" alt="author avatar" >
    <div class="post-info">
      <h1>{{post.authorName}}</h1>
      <p>Posté le : {{ new Date(post.postCreationDate).toLocaleString('fr-FR')}}</p>
    </div>
  </div>
  <div class="post-body">
    <img :src="post.postImageUrl" alt="post image">
    <p></p>
  </div>
  <div class="post-footer"></div>
</div>
</template>

<style lang="scss" scoped>
.post-list {
  max-width: $max-width-desk;
  margin: 10px auto;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.514);
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  .post-header {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    background-color: $fourth;
    margin-bottom: 5px;
    text-align: left;
    img {
      height: 60px;
      width: 60px;
    }
  }
  .post-body {
    width: 100%;
    margin-bottom: 5px;
    img {
      width: 100%;
      max-height: 300px;
      object-fit: contain;
    }
  }
}
</style>
