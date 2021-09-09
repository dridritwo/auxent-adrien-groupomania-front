<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()

const user = computed(() => store.state.user)
const formatedUser = computed(() => store.getters.formattedUser)

const formData = ref({
  email: "",
  password: ""
})

async function submit() {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let response = await fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({email: formData.value.email, password: formData.value.password})
  }).then((response) => {
    return response.json()
  })
  console.log("response : ", response)
  store.commit('SET_USER', response)
  console.log("state : ", store.state.user)
}

async function getUsers() {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNiIsImlhdCI6MTYzMTE5OTk5OSwiZXhwIjoxNjMxMjg2Mzk5fQ.3hJIby5jbbr-HM5roGGT-G2O-eAsTXV7lQXy54gerpM`);
  let response = await fetch("http://localhost:3000/api/v1/users", {
    method: "GET",
    headers: myHeaders,
  }).then((response) => {
    return response.json()
  })
  console.log("response : ", response)
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
