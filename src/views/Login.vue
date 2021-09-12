<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import {logUser} from '@/services/UserService'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = useStore()

const user = computed(() => store.state.user)
const formatedUser = computed(() => store.getters.formattedUser)

const formData = ref({
  email: "",
  password: ""
})

async function submit() {
  let response = await logUser(formData.value);
  console.log("response : ", response)
  store.commit('SET_USER', response)
  router.push('/home')
}

</script>


<template>
  <div id="home">
    <div class="home-container">
      <div class="username" v-if="store.state.user">
        user : {{user.username}}
      </div>
      formatted user : {{formatedUser}}
      <h1>Sign in</h1>
      <form id="login-form" @submit.prevent="submit">
        <label for="email">Email:</label>
        <input class="input" type="email" name="email" v-model="formData.email" placeholder="email" />
        <label for="password">Password:</label>
        <input class="input" type="password" name="password" v-model="formData.password" placeholder="password" />

        <button class="button">Submit</button>
      </form>
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
