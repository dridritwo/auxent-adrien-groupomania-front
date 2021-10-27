<script setup lang="ts">
import { computed, ref, Ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { deletePost } from "../../services/PostService";
import { sendLike } from "../../services/LikeService";
import { getComments } from "../../services/CommentService";
import UpVote from "../../assets/UpVote.vue";
import IconComment from "../../assets/IconComment.vue";
import { Comment } from "../../models/CommentModel";
import CommentCompVue from "./CommentComponent.vue";
import NewCommentForm from "./NewCommentForm.vue";

const emit = defineEmits(["onLike"]);
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
  commentsCount: Number,
});
const showAllText: Ref<Boolean> = ref(false);
const showLessOrMore: Ref<String> = ref("Montrer plus");
const postHeader: Ref<Element> = ref();
const comments: Ref<Comment[]> = ref(null);
const commentForm: Ref<Boolean> = ref(false);
const commentAddedCount: Ref<number> = ref(0);

const userLiked = computed(() => props.likeStatus === 1);
const userDisliked = computed(() => props.likeStatus === -1);
const textIsTooLong = computed(
  () => props.text.length > 300 || props.text.split(/\r*\n/).length > 10
);
const fadeText = computed(() => textIsTooLong.value && !showAllText.value);

function showAllTextFunction(event) {
  showAllText.value = !showAllText.value;
  let postHeader = event.currentTarget.parentNode.parentNode.previousSibling;
  if (!showAllText.value) {
    showLessOrMore.value = "Montrer plus";
    postHeader.scrollIntoView();
    showAllText.value = false;
  } else {
    showLessOrMore.value = "Montrer moins";
    showAllText.value = true;
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

async function upVote() {
  if (props.likeStatus === 1) {
    let res = await sendLike(props.id, 0);
    if (res.status === 201) {
      emit("onLike", {
        postId: props.id,
        likeStatus: 0,
        likeToAdd: -1,
        dislikeToAdd: 0,
      });
    }
  } else if (props.likeStatus === 0) {
    let res = await sendLike(props.id, 1);
    if (res.status === 201) {
      emit("onLike", {
        postId: props.id,
        likeStatus: 1,
        likeToAdd: 1,
        dislikeToAdd: 0,
      });
    }
  } else if (props.likeStatus === -1) {
    let res = await sendLike(props.id, 1);
    if (res.status === 201) {
      emit("onLike", {
        postId: props.id,
        likeStatus: 1,
        likeToAdd: 1,
        dislikeToAdd: -1,
      });
    }
  }
}

async function downVote() {
  if (props.likeStatus === 1) {
    let res = await sendLike(props.id, -1);
    if (res.status === 201) {
      emit("onLike", {
        postId: props.id,
        likeStatus: -1,
        likeToAdd: -1,
        dislikeToAdd: 1,
      });
    }
  } else if (props.likeStatus === 0) {
    let res = await sendLike(props.id, -1);
    if (res.status === 201) {
      emit("onLike", {
        postId: props.id,
        likeStatus: -1,
        likeToAdd: 0,
        dislikeToAdd: 1,
      });
    }
  } else if (props.likeStatus === -1) {
    let res = await sendLike(props.id, 0);
    if (res.status === 201) {
      emit("onLike", {
        postId: props.id,
        likeStatus: 0,
        likeToAdd: 0,
        dislikeToAdd: -1,
      });
    }
  }
}

async function showComments() {
  commentForm.value = !commentForm.value;
  if (!comments.value) {
    let response: Comment[] = await getComments(props.id);
    comments.value = response;
  } else {
    comments.value = null;
  }
}

function onCommentSuccess(payload) {
  comments.value.unshift(payload)
  commentAddedCount.value += 1;
}

function onCommentDeleteSuccess(commentId) {
  comments.value = comments.value.filter(function(value, index, arr){ 
        return value.id !== commentId;
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
    <p class="post-text" :class="{ fade: fadeText, notfade: !fadeText }">
      {{ text }}
    </p>
    <div class="button-container">
      <button
        @click="showAllTextFunction"
        v-if="textIsTooLong"
        class="button-small"
      >
        {{ showLessOrMore }}
      </button>
    </div>
  </div>
  <div class="post-footer">
    <div class="flex-h">
      <div class="comments-icon-container flex-h">
        <IconComment @click="showComments" class="hover-grow" />
        {{ commentsCount + commentAddedCount }}
      </div>
      <div class="like-container flex-h">
        <UpVote @click="upVote" :active="userLiked" :down="false" />
        <strong>{{ props.likes - props.dislikes }}</strong>
        <UpVote @click="downVote" :active="userDisliked" :down="true" />
      </div>
    </div>
  </div>
  <div v-if="commentForm" class="comment-form">
    <NewCommentForm @on-comment-success="onCommentSuccess" :post_id="props.id" />
  </div>
  <div v-if="comments" class="comments-container">
    <div v-for="comment in comments" class="comment-container">
      <CommentCompVue
        :id="comment.id"
        :text="comment.text"
        :username="comment.username"
        :author_id="comment.author_id"
        :post_id="comment.post_id"
        :avatarUrl="comment.avatarUrl"
        :creation_date="new Date(comment.creation_date)"
        @onCommentDeleteSuccess="onCommentDeleteSuccess"
      />
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
  &:hover {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.35));
  }
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
  max-height: 180px;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0, 1.02, 0, 0.98);
}
.notfade {
  transition: max-height 1s cubic-bezier(1, 0.08, 1, -0.19);
  max-height: 10000px;
  overflow: hidden;
}

.button-small {
  margin: 0;
}
strong {
  color: white;
}
.comments-container {
  color: white;
  background-color: $primary;
  padding: 10px;
  width: 100%;
  
}
.comment-container {
  margin: 3px 0px;
}
.comments-icon-container {
  color: white;
}
.comment-form {
  width: 100%;
}
</style>
