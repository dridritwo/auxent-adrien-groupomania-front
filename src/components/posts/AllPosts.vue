<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, Ref, watch } from "vue";
import { getAllPosts, getMorePosts } from "../../services/PostService";
import { Post } from "../../models/PostModel";

const store = useStore();
const posts: Ref<Post[]> = ref([]);
const sentinal: Ref<Element> = ref();
const isIntersectingElement: Ref<Boolean> = ref(false);
const isLoading: Ref<Boolean> = ref(false);
const currentPage: Ref<number> = ref(0);
const lastKnownScrollPosition: Ref<number> = ref(0);
const ticking: Ref<Boolean> = ref(false);
const poto: Ref<string> = ref("Chargement des poteaux...");

watch(isIntersectingElement, async (isIntersecting, prevCount) => {
  console.log("there");
  if (isIntersecting && !isLoading.value) {
    console.log("here");
    await goGetMorePosts();
  }
});

onMounted(async () => {
  isLoading.value = true;
  let allPosts = await getAllPosts();
  await allPosts.forEach((post) => {
    posts.value.push(post);
  });
  isLoading.value = false;
  setTimeout(() => {
    createObserver();
  }, 2000);
});


async function goGetMorePosts() {
isLoading.value = true;
currentPage.value = currentPage.value + 1;
let morePosts = await getMorePosts(currentPage.value);
if (!morePosts) {
  poto.value = "Il n'y a plus de poteaux."
} else {

  await morePosts.forEach((post) => {
    posts.value.push(post);
isLoading.value = false;
});
  }
}

function createObserver() {
  const handler = (entries) => {
    if (entries[0].isIntersecting) {
      isIntersectingElement.value = true;
    } else {
      isIntersectingElement.value = false;
    }
  };
  const observer = new window.IntersectionObserver(handler);
  observer.observe(sentinal.value);
}
</script>

<template>
<div class="list-container">

  <div v-if="posts" v-for="post in posts" class="post-list">
    <div class="post-header">
      <img :src="post.authorAvatarUrl" alt="author avatar" />
      <div class="post-info">
        <h1>{{ post.authorName }}</h1>
        <p>
          Posté le :
          {{
            new Date(post.postCreationDate).toLocaleString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          }}
        </p>
      </div>
    </div>
    <div class="post-body">
      <img :src="post.postImageUrl" alt="post image" />
      <p>{{ post.text }}</p>
    </div>
    <div class="post-footer"></div>
  </div>
      </div>
  <div id="chargement">
    <div @click="goGetMorePosts" id="poto">
      {{poto}}
    </div>
    </div>
  <div ref="sentinal"></div>
</template>

<style lang="scss" scoped>
.list-container {
  min-height: 100vh;
}
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
      border-radius: 50%;
      margin: 0 5px;
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
#chargement {
  #poto {
    background-color: $secondary;
    padding: 10px;
    width: 300px;
    margin: auto;
    border-radius: 15px;
    cursor: pointer;
  }
}
</style>
