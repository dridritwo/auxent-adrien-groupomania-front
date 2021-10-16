<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { computed, ref, Ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { deletePost } from "../../services/PostService";
import UpVote from "../../assets/UpVote.vue";

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
  likes: Number,
  dislikes: Number,
  likeStatus: Number,
});
const showAllText: Ref<Boolean> = ref(false);
const showLessOrMore: Ref<String> = ref();
const fadeText: Ref<Boolean> = ref();
const postHeader: Ref<Element> = ref();

const userLiked = computed(() => props.likeStatus === 1);
const userDisliked = computed(() => props.likeStatus === -1);

const textComputed = computed(() => {
  if (!showAllText.value) {
    showLessOrMore.value = "Montrer plus";
    fadeText.value = true;
    return props.text.substring(0, 300);
  } else {
    showLessOrMore.value = "Montrer moins";
    fadeText.value = false;
    return props.text;
  }
});

function showAllTextFunction(event) {
  showAllText.value = !showAllText.value;
  let postHeader = event.currentTarget.parentNode.parentNode.previousSibling;
  if (!showAllText.value) {
    postHeader.scrollIntoView()
  }
}


async function deleteIt() {
  await deletePost(props.id);
  router.go(0);
}

function updateIt() {
  router.push({
    name: "UpdatePost",
    params: {
      title: props.title,
      id: props.id,
      text: props.text,
      postImageUrl: props.postImageUrl,
    },
  });
}
</script>

<template>
  <div ref="postHeader" class="post-header">
    <img :src="authorAvatarUrl" alt="author avatar" />
    <div class="post-info">
      <h1>{{ title }}</h1>
      <span
        id="delete-post"
        @click="deleteIt"
        v-if="
          store.state.user.role === 'admin' || authorId === store.state.user.id
        "
        >Supprimer</span
      >
      <span
        id="update-post"
        @click="updateIt"
        v-if="
          store.state.user.role === 'superAdmin' ||
          authorId === store.state.user.id
        "
        >Editer</span
      >
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
    <p class="post-text" :class="{ fade: fadeText }">{{ textComputed }}</p>
    <div class="button-container">
      <button
        @click="showAllTextFunction"
        v-if="props.text.length > 300"
        class="button-small"
      >
        {{ showLessOrMore }}
      </button>
    </div>
  </div>
  <div class="post-footer">
    <div class="comments-container"></div>
    <div class="flex-h">
      <div class="like-container flex-h">
        <UpVote :active="userLiked" :down="false" />
        {{ props.likes - props.dislikes }}
        <UpVote :active="userDisliked" :down="true" />
      </div>
    </div>
  </div>
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
  .post-text {
    text-align: left;
    width: 100%;
    padding: 20px;
    color: white;
    white-space: pre-wrap;
  }
}
.post-body,
.post-footer {
  background-color: $primary;
}
#delete-post,
#update-post {
  cursor: pointer;
  color: $fifth;
  font-weight: bolder;
  background-color: white;
  border-radius: 5px;
  padding: 0 3px;
  margin-right: 3px;
}
.post-footer {
  width: 100%;
  .flex-h {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width: 100%;
    padding: 10px 30px;
  }
}
.fade {
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}

.button-small {
  margin: 0;
}
</style>