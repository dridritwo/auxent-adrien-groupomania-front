<script setup>
defineProps({
  text: String
})

</script>

<template>
<router-link class="button" to='/about'>{{ text }}</router-link>
 
</template>

<style lang="scss" scoped>
.button {
  color: $dark;
  background-color: $light-grey;
  width: 80%;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.35));
  border-radius: 20px;
  border: none;
  margin: 10%;
  padding: 20px;
  display: block;

  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 36px;
}
</style>
