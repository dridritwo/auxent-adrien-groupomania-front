<script setup>
import HomeNotLogged from '@/views/HomeNotLogged.vue'
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  
  <router-view></router-view>
</template>

<style lang="scss">


#app {
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
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
