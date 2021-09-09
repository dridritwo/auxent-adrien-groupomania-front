<script setup>
import ButtonBig from '@/components/buttons/ButtonBig.vue';
import IconAboveFont1 from '@/assets/IconAboveFont1.vue';


function logIn() {
  console.log("login", this.$router)
  //this.$router.push('/login')
}
function goAbout() {
  console.log("router : ", this.$router)
}
</script>

<template>
  <div id="home-not-logged">
    <IconAboveFont1 />
    <ButtonBig @click="logIn()" text="Log in" />
    <ButtonBig  text="Sign up" />
    <button @click="goAbout()">go about</button>
  </div>
</template>

<style lang="scss" scoped>
#home-not-logged {
  background-color: $primary;
  width: 100%;
  height: 100%;
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}

</style>
