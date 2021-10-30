<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ref, Ref, watch } from "vue";
import { getAllPostsByAuthorId } from "../../services/PostService";
import { Post } from "../../models/PostModel";
import PostComponent from "./PostComponent.vue";

const store = useStore();
const posts: Ref<Post[]> = ref([]);
const sentinal: Ref<Element> = ref();
const isIntersectingElement: Ref<Boolean> = ref(false);
const isLoading: Ref<Boolean> = ref(false);
const currentPage: Ref<number> = ref(0);
const poto: Ref<string> = ref("Chargement des poteaux...");
let observer: IntersectionObserver;

watch(isIntersectingElement, async (isIntersecting, prevCount) => {
  if (isIntersecting && !isLoading.value) {
    await goGetMorePosts();
  }
});

onMounted(async () => {
  isLoading.value = true;
  let allPosts = await getAllPostsByAuthorId(store.state.user.id, 0);
  await allPosts.forEach((post) => {
    posts.value.push(post);
  });
  isLoading.value = false;
  createObserver();
});

async function goGetMorePosts() {
  isLoading.value = true;
  currentPage.value = currentPage.value + 1;
  let morePosts = await getAllPostsByAuthorId(
    store.state.user.id,
    currentPage.value
  );
  if (!morePosts.length) {
    poto.value = "Il n'y a plus de poteaux.";
  } else {
    await morePosts.forEach((post) => {
      posts.value.push(post);
      isLoading.value = false;
    });
  }
}

function createObserver() {
  const handler = (entries: { isIntersecting: any }[]) => {
    if (entries[0].isIntersecting) {
      isIntersectingElement.value = true;
    } else {
      isIntersectingElement.value = false;
    }
  };
  observer = new window.IntersectionObserver(handler);
  observer.observe(sentinal.value);
}

function onLike({postId, likeStatus, likeToAdd, dislikeToAdd}) {
  let postIndex = posts.value.findIndex((obj => obj.id == postId));
  posts.value[postIndex].likeStatus = likeStatus
  posts.value[postIndex].dislikes = posts.value[postIndex].dislikes + dislikeToAdd
  posts.value[postIndex].likes = posts.value[postIndex].likes + likeToAdd
}
</script>

<template>
  <div class="list-container">
    <div
      v-if="posts && store.state.user"
      v-for="post in posts"
      class="post-list"
    >
      <PostComponent
        :title="post.title"
        :id="post.id"
        :authorAvatarUrl="post.authorAvatarUrl"
        :authorName="post.authorName"
        :authorId="post.authorId"
        :postCreationDate="post.postCreationDate"
        :text="post.text"
        :postImageUrl="post.postImageUrl"
        :likes="post.likes"
        :dislikes="post.dislikes"
        :likeStatus="post.likeStatus"
        :commentsCount="post.commentsCount"
        @onLike="onLike"
      />
    </div>
  </div>
  <div id="chargement">
    <div @click="goGetMorePosts" id="poto">
      {{ poto }}
    </div>
  </div>
  <div ref="sentinal"></div>
</template>

<style lang="scss" scoped>
.list-container {
  min-height: 100vh;
  padding-top: 55px;
  .behind {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 0;
  }
}
.post-list {
  max-width: $max-width-desk;
  margin: 0 auto 40px auto;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.514);
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
  .post-header {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    background-color: $fourth;
    margin-bottom: 0px;
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
    img {
      width: 100%;
      max-height: 300px;
      object-fit: contain;
    }
  }
  .post-body,
  .post-footer {
    background-color: $primary;
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
