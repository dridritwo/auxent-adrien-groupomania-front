<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

function go() {
  store.commit("SET_USER", null);
  localStorage.removeItem("USER");
  router.push("/");
}


</script>

<template>
  <button @click="go">log out</button>
</template>

<style lang="scss" scoped>
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
</style>
