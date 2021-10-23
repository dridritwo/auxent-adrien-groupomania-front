<script setup lang="ts">
import { ref, Ref } from "vue";
import { sendCommentForm } from "../../services/CommentService";
import { Post } from "../../models/PostModel";
import { useRouter } from "vue-router";
import { AxiosError, AxiosResponse } from "axios";
import { useStore } from "vuex";
import {Comment} from "../../models/CommentModel"

const store = useStore();
const emit = defineEmits(["onCommentSuccess"]);
const props = defineProps({
  post_id: Number,
});

const commentForm: Ref<Post> = ref({
  text: "",
});

const success: Ref<Boolean> = ref(false);
const errors: Ref<Boolean> = ref(false);
const isLoading: Ref<Boolean> = ref(false);

async function submit() {
  errors.value = false;
  success.value = false;
  isLoading.value = true;
  let response: AxiosResponse = await sendCommentForm(
    commentForm.value.text,
    props.post_id
  );
  if (response.status === 201) {
    success.value = true;
    emit("onCommentSuccess", {
  username: store.state.user.username,
  author_id: store.state.user.id,
  post_id: props.post_id,
  avatarUrl: store.state.user.avatar_url,
  text: commentForm.value.text,
  creation_date: new Date(),
})
  } else {
    errors.value = true;
  }
  isLoading.value = false;
}
</script>

<template>
  <form id="comment-form" @submit.prevent="submit">
    <textarea
      class="input"
      type="text"
      name="text"
      v-model="commentForm.text"
      placeholder="Message"
    ></textarea>
    <button>Envoyer</button>
  </form>
  <div v-if="success" class="success-div">Sauvegarde effectuée</div>
  <div v-if="errors" class="error-div">Erreur</div>
</template>

<style lang="scss" scoped>
#comment-form {
  margin: 4px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.5fr 0.5fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". .";
}

button {
  color: $dark;
  background-color: $light-grey;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.35));
  border-radius: 10px;
  border: none;
  margin: 3px;
  padding: 10px;
  border: 3px solid white;

  &:hover {
    border: 3px solid $secondary;
  }

  font-family: "Nunito", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 36px;
}

textarea {
  border-radius: 10px;
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}

.error-div {
  color: $fifth;
  font-weight: bolder;
  padding: 15px;
  border: solid 3px $fifth;
  border-radius: 5px;
  background-color: black;
  margin-bottom: 5px;
}

.success-div {
  color: $fourth;
  font-weight: bolder;
  padding: 15px;
  border: solid 3px $secondary;
  border-radius: 5px;
  background-color: $primary;
}
</style>
