<script setup lang="ts">
import { ref } from "vue";
import { signUpUser } from "../services/UserService";
import { useRouter } from "vue-router";
import ArrowLeft from "../assets/ArrowLeft.vue";
const router = useRouter();

const formData = ref({
  email: "",
  password: "",
  username: "",
});

async function submit() {
  await signUpUser(formData.value);
  router.push("/home");
}

function goBack() {
  router.push("/");
}
</script>

<template>
  <main id="home">
    <ArrowLeft class="top-left" @click="goBack" />
    <div class="home-container">
      <div class="header-back">
        <div class="header">
          <h1>Sign up</h1>
        </div>
      </div>
      <div class="form-back">
        <form id="login-form" @submit.prevent="submit">
          <div class="inputs">
            <label for="email">Email:</label>
            <input
              class="input"
              type="email"
              name="email"
              v-model="formData.email"
              placeholder="email"
            />
            <label for="username">Username:</label>
            <input
              class="input"
              type="username"
              name="username"
              v-model="formData.username"
              placeholder="username"
            />
            <label for="password">Password:</label>
            <input
              class="input"
              type="password"
              name="password"
              v-model="formData.password"
              placeholder="password"
            />
          </div>
          <button class="button">Envoyer</button>
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
#home {
  background-color: $primary;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  .home-container {
    max-width: $max-width-desk;
    background-color: $secondary;
    width: 80%;
    border: 1px solid white;
    border-radius: 10px;
    overflow: hidden;
    min-width: 300px;

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
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}
</style>
