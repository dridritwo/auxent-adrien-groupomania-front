<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";

import ArrowLeft from "../assets/ArrowLeft.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import { updateUser } from "../services/UserService";
const router = useRouter();
const store = useStore();

const formData = ref({
  avatar_url: store.state.user.avatar_url,
  username: store.state.user.username,
  email: store.state.user.email,
});

const showUrl = ref(false);
const focus = ref(null);
const success = ref(false);
const errors = ref(null);

onMounted(() => {
  nextTick(() => {
    focus.value.focus();
  });
});

function goBack() {
  router.go(-1);
}

async function handleSubmit() {
  errors.value = null;
  if (checkFormData()) {
    let response = await updateUser(formData.value);
    if (response.statusText === "OK") {
      success.value = true;
      setTimeout(function () {
        success.value = false;
      }, 2000);
    } else {
      errors.value = response;
    }
  }
}
function checkFormData() {
  if (
    validationErrors.value.username.length ||
    validationErrors.value.email.length ||
    validationErrors.value.avatar_url.length
  ) {
    return false;
  } else {
    return true;
  }
}

const validationErrors = ref({
  username: [],
  email: [],
  avatar_url: [],
});
function checkUsername() {
  validationErrors.value.username = [];
  if (formData.value.username.length < 3) {
    validationErrors.value.username.push(
      "Nom d'utilisateur doit avoir au moins trois caractères"
    );
  }
}

function checkEmail() {
  validationErrors.value.email = [];
  if (formData.value.email.length < 1) {
    validationErrors.value.email.push("Email obligatoire");
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(formData.value.email).toLowerCase())) {
    validationErrors.value.email.push("Email doit être valide");
  }
}

function checkAvatarUrl() {
  validationErrors.value.avatar_url = [];
  if (formData.value.avatar_url.length < 1) {
    validationErrors.value.avatar_url.push("Avatar obligatoire");
  }
  if (formData.value.avatar_url.substring(0, 4) !== "http") {
    validationErrors.value.avatar_url.push(
      "Veuillez fournir une url"
    );
  }
}
</script>

<template>
  <div v-on:keyup.enter="handleSubmit" class="profil-container">
    <HeaderComponent />
    <ArrowLeft class="top-left-under" @click="goBack" />
    <div v-if="store.state.user" id="profil">
      <div
        :class="{ 'success-border': success, 'error-border': errors }"
        class="infos-container"
      >
        <img
          @click="showUrl = !showUrl"
          class="profil-image clickable"
          :src="formData.avatar_url"
          alt="avatar"
        />
        <div class="infos">
          <input
            v-if="showUrl"
            :class="{ 'error-input': validationErrors.username.length }"
            @keyup="checkAvatarUrl()"
            class="inputs"
            type="avatar_url"
            name="avatar_url"
            v-model="formData.avatar_url"
          />
          <div
            v-if="validationErrors.avatar_url.length"
            v-for="(error, index) in validationErrors.avatar_url"
            :key="index"
            class="validation"
          >
            {{ error }}
          </div>
          <input
            :class="{ 'error-input': validationErrors.username.length }"
            @keyup="checkUsername"
            class="h1"
            type="username"
            name="username"
            v-model="formData.username"
            ref="focus"
          />
          <div
            v-if="validationErrors.username.length"
            v-for="(error, index) in validationErrors.username"
            :key="index"
            class="validation"
          >
            {{ error }}
          </div>
          <input
            :class="{ 'error-input': validationErrors.email.length }"
            @keyup="checkEmail"
            class="p"
            type="email"
            name="email"
            v-model="formData.email"
          />
          <div
            v-if="validationErrors.email.length"
            v-for="(error, index) in validationErrors.email"
            :key="index"
            class="validation"
          >
            {{ error }}
          </div>
        </div>
        <div v-if="success" class="success-div">Sauvegarde effectuée</div>
        <div v-if="errors" class="error-div">
          Erreur lors de la sauvegarde :
          <div v-for="(error, index) in errors" :key="index">
            - {{ error.msg }}
          </div>
        </div>
      </div>
    </div>
    <button type="submit" @click="handleSubmit">Envoyer</button>
    <button @click="goBack">Retour</button>
  </div>
</template>

<style lang="scss" scoped>
.profil-container {
  background-color: $primary;
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}
.top-left-under {
  position: absolute;
  top: 65px;
  left: 5px;
}

button {
  color: $dark;
  background-color: $light-grey;
  width: 80%;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.35));
  border-radius: 20px;
  border: none;
  margin: 10px;
  padding: 10px;
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 36px;
}

#profil {
  background-color: $primary;
  width: 100vw;
  max-width: $max-width-desk;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  color: white;
  .infos-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    background-color: $light-grey;
    width: 80%;
    margin-top: 60px;
    margin-bottom: 40px;
    padding: 40px;
    color: black;
    .profil-image {
      width: 100%;
      background-color: black;
      border-radius: 50%;
      border: $secondary solid 5px;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
    .infos {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      text-align: left;
      margin-top: 10px;
      p,
      h1 {
        width: 100%;
        line-height: 30px;
      }
    }
  }
}

.h1 {
  width: 100%;
  line-height: 30px;
  border: none;
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  background-color: transparent;
  font-size: xx-large;
  font-weight: bold;
  color: black;
}
.p {
  width: 100%;
  border: none;
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  background-color: transparent;
  font-size: large;
}
.inputs {
  width: 100%;
}
.success-border {
  border: 5px solid $fourth;
}
.success-div {
  color: $fourth;
  font-weight: bolder;
  padding: 15px;
  border: solid 3px $secondary;
  border-radius: 5px;
}
.error-border {
  border: 5px solid $fifth;
}

.error-input {
  border: 1px solid $fifth;
}
.validation {
  color: $fifth;
}
.error-div {
  color: $fifth;
  font-weight: bolder;
  padding: 15px;
  border: solid 3px $fifth;
  border-radius: 5px;
}
</style>
