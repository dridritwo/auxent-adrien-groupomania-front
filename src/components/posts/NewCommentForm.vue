<script setup lang="ts">
import { ref, Ref } from "vue";
import { sendPostForm } from "../../services/PostService";
import { Post } from "../../models/PostModel";
import { useRouter } from "vue-router";
import { AxiosError, AxiosResponse } from "axios";

const router = useRouter();

const postForm: Ref<Post> = ref({
  title: "",
  text: "",
  postImageUrl: "",
});
const success: Ref<Boolean> = ref(false);
const errors: Ref<Boolean> = ref(false);
const isLoading: Ref<Boolean> = ref(false);

async function submit() {
  errors.value = false;
  success.value = false;
  isLoading.value = true;
  let response: Post[] = await sendPostForm(postForm.value);
  if (response) {
    success.value = true;
    setTimeout(function () {
      router.push("/home");
    }, 1000);
  } else {
    errors.value = true;
  }
  isLoading.value = false;
}
</script>

<template>
  <div class="home-container">
    <div class="header-back">
      <div class="header">
        <h1>Nouveau poteau</h1>
      </div>
    </div>
    <div class="form-back">
      <form id="login-form" @submit.prevent="submit">
        <div class="inputs">
          <label for="title">Titre:</label>
          <input
            class="input"
            type="text"
            name="title"
            v-model="postForm.title"
            placeholder="Titre"
            required
          />
          <label for="text">Votre message:</label>
          <textarea
            class="input"
            type="text"
            name="text"
            v-model="postForm.text"
            placeholder="Message"
          ></textarea>
          <label for="imageUrl">Lien de votre image:</label>
          <input
            class="input"
            type="url"
            name="imageUrl"
            v-model="postForm.postImageUrl"
            placeholder="Lien de votre image/gif"
          />
        </div>
        <div v-if="success" class="success-div">Sauvegarde effectuée</div>
        <div v-if="errors" class="error-div">Erreur</div>
        <button class="button">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  max-width: $max-width-desk;
  background-color: $secondary;
  width: 80%;
  border: 1px solid white;
  border-radius: 10px;
  overflow: hidden;
  min-width: 300px;
  margin-top: 30px;

  .header-back {
    background-color: $fourth;
    .header {
      background-color: $secondary;
      border-radius: 0% 0 20px 0;
      padding: 20px 0px;
      font-size: 35px;
    }
  }
  .form-back {
    background-color: $secondary;
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      background-color: $fourth;
      border-radius: 20px 0 0px 0;
      padding: 5%;
      .inputs {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        font-size: 30px;
        margin: 20px 0px;
      }
      .button {
        margin: 0%;
      }
      input {
        margin-bottom: 15px;
        text-align: start;
        font-size: large;
      }
      textarea {
        width: 100%;
      }
      label {
        text-align: start;
        width: 100%;
      }
    }
  }
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
