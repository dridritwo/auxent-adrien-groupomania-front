<script setup>
import { useStore } from "vuex";
import { onMounted, computed, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

import ButtonLogOut from "../components/buttons/ButtonLogOut.vue";
import ButtonDeleteUser from "@/components/buttons/ButtonDeleteUser.vue";
import ArrowLeft from "../assets/ArrowLeft.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import ProfilInfoComponent from "../components/ProfilInfoComponent.vue";
import ButtonMedium from "../components/buttons/ButtonMedium.vue";
import { updateUser } from "../services/UserService";
const route = useRoute();
const router = useRouter();

const store = useStore();

const formData = ref({
  avatar_url: store.state.user.avatar_url,
  username: store.state.user.username,
});


const showUrl = ref(false);
const focus = ref(null);
const success = ref(false);
const error = ref(false);

  onMounted(() => {
    nextTick(() => {
      focus.value.focus();
    });
  });

function goBack() {
  router.go(-1);
}

async function handleSubmit() {
  let response = await updateUser(formData.value);
  if (response) {
    success.value = true
    setTimeout(function () {
      success.value = false
    }, 2000);
  } else {
    error.value = true
    setTimeout(function () {
      error.value = false
    }, 2000);
  }
}

</script>

<template>
  <div v-on:keyup.enter="handleSubmit" class="profil-container">
    <HeaderComponent />
    <ArrowLeft class="top-left-under" @click="goBack" />
      <div v-if="store.state.user"  id="profil">
        <div :class="{ 'success-border': success, 'error-border': error }" class="infos-container">
          <img
            @click="showUrl=!showUrl"
            class="profil-image clickable"
            :src="`${formData.avatar_url}`"
            alt="avatar"
          />
          <div class="infos">
            <input
            v-if="showUrl"
              class="inputs"
              type="avatar_url"
              name="avatar_url"
              v-model="formData.avatar_url"
            />
            <input
              class="h1"
              type="username"
              name="username"
              v-model="formData.username"
              ref="focus"
            />
            <p>{{ store.state.user.email }}</p>
          </div>
          <div v-if="success" class="success-div">Sauvegarde effectuée</div>
          <div v-if="error" class="error-div">Erreur lors de la sauvegarde</div>
        </div>
      </div>
    <button type="submit" @click="handleSubmit">Envoyer</button>
    <button @click="goBack">Annuler</button>
  </div>
</template>

<style lang="scss" scoped>
.profil-container {
  background-color: $primary;
  width: 100vw;
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
.error-div {
  color: $fifth;
  font-weight: bolder;
  padding: 15px;
  border: solid 3px $fifth;
  border-radius: 5px;
}
</style>
