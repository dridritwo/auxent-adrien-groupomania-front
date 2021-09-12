<script setup>
import ButtonBig from '@/components/buttons/ButtonBig.vue';
import IconAboveFont1 from '@/assets/IconAboveFont1.vue';
import { useStore } from 'vuex'
import { ref } from 'vue'
import { onMounted, computed } from 'vue'
import ButtonLogOut from '../components/buttons/ButtonLogOut.vue';

const store = useStore()
const user = computed(() => store.state.user)
const formatedUser = computed(() => store.getters.formattedUser)

onMounted(() => {
      console.log('Component is mounted!')
      console.log("user : ", user)
    })
</script>

<template>
  <div id="home">
    <div class="home-container">
 name {{ user.username }}
 name {{ formatedUser }}

 
      
    <ButtonLogOut />
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
  color: white;
  .home-container {
    max-width: $max-width-desk;
  }
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}

</style>
