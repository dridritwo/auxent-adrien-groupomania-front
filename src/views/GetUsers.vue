<script setup lang="ts">
import { ref } from 'vue'
import {getUsersService} from '../services/UserService'

const users = ref()

async function getUsers() {
  users.value = await getUsersService();
}
</script>

<template>
  <div id="home">
    <div class="home-container">
      <button @click="getUsers">get users </button>
      <div class="di" v-for="user in users">
        {{user.id}} : {{user.username}}
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
    padding: 50px;

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      input {
        margin-bottom: 15px;
        text-align: start;
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
