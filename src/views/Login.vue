<script setup lang="ts">
import { UserModel } from "../models/UserModel";
import { ref } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { logUser } from "../services/UserService";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const store = useStore();

const user = computed(() => store.state.user);
const formatedUser = computed(() => store.getters.formattedUser);

const formData = ref({
  email: "",
  password: "",
});

async function submit() {
  let response: UserModel = await logUser(formData.value);
  store.commit("SET_USER", response);
  localStorage.setItem("USER", JSON.stringify(response));
  router.push("/home");
}
function goBack() {
  router.push("/");
}
</script>

<template>
  <div id="home">
    <div class="home-container">
      <div class="header-back">
        <div class="header">
          <h1>Sign in</h1>
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
            <label for="password">Password:</label>
            <input
              class="input"
              type="password"
              name="password"
              v-model="formData.password"
              placeholder="password"
            />
          </div>
          <div class="buttons-div">
            <button class="button" @click="goBack">Back</button>
            <button class="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#home {
  background-color: $primary;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
        .buttons-div {
          display: flex;
          gap: 2%;
          width: 100%;
          flex-basis: 1 2;
        }
      }
    }
  }
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}
</style>
