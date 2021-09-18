<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex";
import { deleteUser } from "@/services/UserService";
import { ref } from "vue";

const store = useStore();
const route = useRoute()
const router = useRouter()

const success = ref(false);

async function delUser() {
  let response = await deleteUser(store.state.user.id, store.state.user.token);
  if (response.ok) {
    success.value = true;
    setTimeout(function () {
      store.commit("SET_USER", null);
      localStorage.removeItem("USER");
      router.push("/")
    }, 1000);

  }
}

</script>

<template>
  <button @click="delUser">Delete User</button>
  <div v-if="success">Delete Success</div>
</template>

<style lang="scss" scoped>
button {
  color: $dark;
  background-color: $fifth;
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
