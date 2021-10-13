<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { deletePost } from "../../services/PostService";

const router = useRouter();

const store = useStore();
const props = defineProps({
  id: Number,
  title: String,
  authorAvatarUrl: String,
  postCreationDate: String,
  authorName: String,
  authorId: Number,
  postImageUrl: String,
  text: String,
});


onMounted(async () => {});

async function deleteIt() {
  await deletePost(props.id);
  router.go(0);
}
</script>

<template>
  <div class="post-header">
    <img :src="authorAvatarUrl" alt="author avatar" />
    <div class="post-info">
      <h1>{{ title }}</h1> <span id="delete-post" @click="deleteIt" v-if="store.state.user.role === 'admin' || authorId === store.state.user.id">Delete</span>
      <p>
        Posté le :
        {{
          new Date(postCreationDate).toLocaleString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        }}
        par {{ authorName }}
      </p>
    </div>
  </div>
  <div class="post-body">
    <img v-if="postImageUrl" :src="postImageUrl" alt="post image" />
    <p>{{ text }}</p>
  </div>
  <div class="post-footer"></div>
</template>

<style lang="scss" scoped>
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
#delete-post {
  cursor: pointer;
  color: $fifth;
  font-weight: bolder;
  background-color: white;
  border-radius: 5px;
  padding: 0 3px;
}
</style>
