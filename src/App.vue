<script setup lang="ts">
import { AxiosResponse } from 'axios';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { UserModel } from './models/UserModel';
import { getUser } from "./services/UserService";

const store = useStore();

onMounted(async () => {
  let localUser: UserModel = JSON.parse(localStorage.getItem("USER"));
  if (localUser) {
    let response: AxiosResponse = await getUser(localUser.token);
    if (response.status == 200) {
      let user: UserModel = response.data;
      user.token = localUser.token;
      store.commit("SET_USER", user);
    } else {
      localStorage.removeItem("USER");
    }
  } else {
    store.state.user = null;
  }
});
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
#app {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
  padding: 0px;
  .full {
    width: 100vw;
    min-height: 100vh;
    max-width: 1100px;
  }
}
html {
  min-height: 100vh;
  min-width: 100vw;

  body {
    padding: 0px;
    margin: 0px;
    min-height: 100vh;
    min-width: 100vw;
  }
}

* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
</style>
