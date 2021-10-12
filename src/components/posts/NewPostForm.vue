<script setup lang="ts">
import { ref, Ref } from "vue";
import { sendPostForm } from "../../services/PostService";
import { Post } from "../../models/PostModel";

const postForm: Ref<Post> = ref({
  title: "",
  text: "",
  postImageUrl: "",
});

async function submit() {
  let response = await sendPostForm(postForm.value);
  console.log("here response : ", response);
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
            <input
              class="input"
              type="text"
              name="text"
              v-model="postForm.text"
              placeholder="Message"
            />
            <label for="imageUrl">Lien de votre image:</label>
            <input
              class="input"
              type="url"
              name="imageUrl"
              v-model="postForm.postImageUrl"
              placeholder="Lien de votre image/gif"
            />
          </div>
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
</style>
