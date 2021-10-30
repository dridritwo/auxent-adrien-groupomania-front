<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

</script>

<template>
    <div v-if="store.state.user" id="profil">
      <div class="infos-container">
        <img class="profil-image" :src="store.state.user.avatar_url" alt="avatar" />
        <div class="infos">
          <h1>{{ store.state.user.username }}</h1>
          <p>{{ store.state.user.email }}</p>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
#profil {
  background-color: $primary;
  width: 100vw;
  max-width: $max-width-desk;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  color: white;
  .infos-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    background-color: $light-grey;
    width: 80%;
    margin-top: 60px;
    margin-bottom: 40px;
    padding: 40px;
    color: black;
    .profil-image {
      width: 100%;
      background-color: black;
      border-radius: 50%;
      border: $secondary solid 5px;
      object-fit: cover;
      aspect-ratio: 1 / 1;
    }
    .infos {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
      text-align: left;
      margin-top: 10px;
      p, h1 {
        width: 100%;
        line-height: 30px;
      }
    }
  }
}

.top-left-under {
  position: absolute;
  top: 65px;
  left: 5px;
}
</style>
