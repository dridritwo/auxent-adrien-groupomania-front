<script setup lang="ts">
import { AxiosResponse } from 'axios';
import { useStore } from 'vuex';
import { deleteComment } from '../../services/CommentService';

const store = useStore();
const props = defineProps({
  username: String,
  author_id: Number,
  post_id: Number,
  avatarUrl: String,
  id: Number,
  text: String,
  creation_date: Date
});

const emit = defineEmits(["onCommentDeleteSuccess"]);

async function deleteIt() {
  const response: AxiosResponse = await deleteComment(props.id);
  if (response.status === 200) {
    emit("onCommentDeleteSuccess", props.id)
  }
}

</script>

<template>
  <div class="comment">
    <div ref="commentHeader" class="comment-header">
      <img :src="avatarUrl" alt="author avatar" />
      <div class="post-info">
        <h1>{{ username }}</h1>
        <span
          id="delete-comment"
          @click="deleteIt"
          v-if="
            store.state.user.role === 'admin' ||
            author_id === store.state.user.id
          "
          >Supprimer</span
        >
        <p>
          Posté le :
          {{
            new Date(creation_date).toLocaleString("fr-FR", {
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
    <div class="comment-body">
    
    <p class="comment-text">
      {{ text }}
    </p>
    
  </div>
  </div>
</template>

<style lang="scss" scoped>

.comment {
  border: 1px solid $tertiary;
  
}
.comment-header {
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
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
}
.comment-body {
  width: 100%;
  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
  .comment-text {
    text-align: left;
    width: 100%;
    padding: 20px;
    color: white;
    white-space: pre-wrap;
    background-color: $primary;
  }
}

#delete-comment,
#update-comment {
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


</style>
