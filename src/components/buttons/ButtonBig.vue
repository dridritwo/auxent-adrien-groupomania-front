<script setup>
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

function go() {
  router.push(props.routeUrl)
}

const props = defineProps({
  text: String,
  routeUrl: String
})

</script>

<template>
  <button @click="go">{{ text }}</button>
</template>

<style lang="scss" scoped>
button {
  color: $dark;
  background-color: $light-grey;
  width: 80%;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.35));
  border-radius: 20px;
  border: none;
  margin: 10%;
  padding: 20px;

  font-family: "Nunito", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 36px;
}
</style>
